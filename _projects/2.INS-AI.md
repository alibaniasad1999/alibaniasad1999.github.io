---
layout: post
title: INS-AI
order: 2
description: Neural‑Network‑Aided Autonomous Vehicle Navigation Without GPS.
image: "/assets/images/ins-ai.jpeg"
---


<!-- _includes/head-custom.html  (or drop straight into your default layout) -->
<script>
window.MathJax = {
  tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
  svg: { fontCache: 'global' }
};
</script>
<script defer
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      integrity="sha512-TJk9a38m…(truncated)…"
      crossorigin="anonymous" referrerpolicy="no-referrer" />


<h1><i class="fa-solid fa-brain"></i> Neural‑Network‑Aided Autonomous Vehicle </h1>

**GitHub:** <https://github.com/alibaniasad1999/INS-AI>

---


![](/assets/images/graphical_abstract.png)

## Executive Summaryc

* **Problem — GNSS fragility:** Autonomous vehicles depend on continuous Global Navigation Satellite System (GNSS) updates. Urban canyons, tunnels, or deliberate jamming interrupt the signal, causing centimetre‑accurate localisation to degrade to meter‑scale drift within seconds.
* **Proposed solution — GNSS‑Free Neural Navigation (GFNN):** A lightweight two‑layer LSTM is trained online while GNSS is available, ingesting inertial measurements and wheel‑odometry states. When the satellite link is lost, the network propagates position, velocity, and heading, constraining drift to <0.3 % of distance travelled.
* **Impact:** In simulated 15‑minute GNSS blackouts over mixed urban–highway routes, the vehicle’s lateral error remained below 25 cm (95th percentile), outperforming a tightly coupled EKF baseline by an order of magnitude.

---

## 1 Introduction

Precise localisation is a foundation of safe autonomous driving. Although high‑definition maps and multi‑sensor fusion reduce reliance on any single modality, today’s production stacks still treat Real‑Time Kinematic (RTK) GNSS as the primary global reference. Unfortunately, signal blockage from skyscrapers or intentional interference can last minutes. Pure inertial or odometric dead‑reckoning alone typically drifts several metres per minute—unacceptable at junctions or during overtakes.

This note summarises a recent preprint that reframes the outage problem as a supervised sequence‑prediction task, replacing explicit kinematic models with a Recurrent Neural Network (RNN) that learns vehicle dynamics on the fly.
<div style="text-align:center;">
  <video
      src="/assets/video/ins-ai.mp4"
      width="640" height="360"
      autoplay muted loop playsinline
      style="display:block; margin:0 auto;">
    <!-- Fallback text for very old browsers -->
    Your browser doesn’t support HTML5 video.  
    <a href="/assets/video/ins-ai.mp4">Download the clip</a>.
  </video>
</div>

## 2 Methodology

### 2.1 Network architecture

Long Short‑Term Memory networks are a class of recurrent neural networks specifically designed to capture **long‑range temporal dependencies** while mitigating the vanishing‑gradient problem that plagues vanilla RNNs.

At each time step *t*, an LSTM maintains a hidden state **h<sub>t</sub>** and a cell state **c<sub>t</sub>**. Three multiplicative **gates** regulate the information flow:

| Gate       | Equation (*σ* = sigmoid, *⊙* = Hadamard product)                                                                                                                              | Role                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Forget** | *f<sub>t</sub> = σ(W<sub>f</sub>\[h<sub>t‑1</sub>, x<sub>t</sub>] + b<sub>f</sub>)*                                                                                           | Decides which parts of the previous cell state to discard.     |
| **Input**  | *i<sub>t</sub> = σ(W<sub>i</sub>\[h<sub>t‑1</sub>, x<sub>t</sub>] + b<sub>i</sub>)*<br>*ĉ<sub>t</sub> = tanh(W<sub>c</sub>\[h<sub>t‑1</sub>, x<sub>t</sub>] + b<sub>c</sub>)* | Selects new candidate information to add to the cell.          |
| **Output** | *o<sub>t</sub> = σ(W<sub>o</sub>\[h<sub>t‑1</sub>, x<sub>t</sub>] + b<sub>o</sub>)*                                                                                           | Chooses which parts of the cell to expose as the hidden state. |

The cell and hidden states update as:

* c<sub>t</sub> = *f<sub>t</sub> ⊙ c<sub>t‑1</sub>* + *i<sub>t</sub> ⊙ ĉ<sub>t</sub>*
* h<sub>t</sub> = *o<sub>t</sub> ⊙ tanh(c<sub>t</sub>)*

Thanks to this gated architecture, an LSTM can **remember wheel‑speed biases seen tens of seconds ago while reacting immediately to high‑frequency IMU spikes**—a critical property for accurate dead‑reckoning.

<div style="text-align:center;">
  <img src="/assets/images/ins-ai/lstm.png"
       alt=""
       width="380"           
       style="display:block;margin:0 auto;">
  <p>Critic network (value).</p>
</div>

<div style="text-align:center;">
  <img src="/assets/images/ins-ai/ins-ai-stru.png"
       alt="Structure of the Proposed Modular Neural Network.."
       width="720"           
       style="display:block;margin:0 auto;">
  <p>Critic network (value).</p>
</div>

* **Inputs:** Last *n* inertial samples (triaxial accelerometer + gyro) and wheel‑speed estimates.
* **Core:** Two stacked LSTMs with layer normalization capture non‑linear longitudinal‑lateral coupling.
* **Head:** Two fully connected layers output incremental pose (translation and yaw change) at 100 Hz.
* **Training regime:** Online supervised learning with Adam (initial lr = 1 × 10⁻²), truncated BPTT window 2 s, early stopping on validation loss.
* **Model compression:** 30 % structured pruning yields 9 ms inference time on an NXP i.MX 8M CPU while retaining 95 % of full‑size accuracy.

### 2.2 Integration with the localisation stack

During nominal operation the GNSS position update closes the loop in an Extended Kalman Filter (EKF). GFNN’s predictions are fused as pseudo‑measurements using adaptive covariance inflation. When GNSS is unavailable the filter smoothly transitions to GFNN‑only propagation.

## 3 Experimental Setup

| Parameter   | Value                                             |
| ----------- | ------------------------------------------------- |
| Vehicle     | Mid‑size EV with SAE L4 sensor suite              |
| IMU         | Automotive‑grade MEMS, 200 Hz (gyro bias 0.8 °/h) |
| Odometry    | Wheel pulses @ 250 Hz, calibration 0.4 %          |
| Routes      | 42 km (urban canyon), 78 km (ring‑road)           |
| GNSS outage | Random windows 1–15 min, mean 7 min               |

Ground truth comes from a roof‑mounted GNSS/INS reference system (NovAtel SPAN CPT). Evaluation metrics are lateral & longitudinal position error and heading deviation.

## 4 Results

### 4.1 Position accuracy

| Scenario | Outage length | EKF (m) | **GFNN‑aided** (m) |
| -------- | ------------- | ------- | ------------------ |
| Urban    | 5 min         | 3.6     | **0.31**           |
| Urban    | 15 min        | 12.8    | **0.78**           |
| Highway  | 5 min         | 2.1     | **0.18**           |
| Highway  | 15 min        | 6.4     | **0.59**           |

### 4.2 Heading error (95th percentile)

* **EKF alone:** 1.7 °
* **GFNN‑aided:** 0.14 °

### 4.3 Ablation study

Removing online adaptation increases lateral drift by 45 %; ablating odometry input raises it by 63 %.

## 5 Conclusions

The GFNN demonstrates that a compact RNN, trained opportunistically during signal availability, can bridge multi‑minute GNSS gaps while running on automotive‑grade hardware. Future work includes:

1. Extending to full 6‑DoF motion for off‑road scenarios.
2. Joint optimisation with visual odometry to handle wheel slip.
3. Formal safety‑case integration within ISO 26262 compliant architectures.

---

### Reference

Full preprint: [INS-AI.pdf](/assets/papers/revised.pdf)

