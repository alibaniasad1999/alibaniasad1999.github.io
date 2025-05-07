---
layout: post
title: LQIR-DG
description: Differential Game-Based Controller
image: "/assets/images/LQDG.jpeg"
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


<h1><i class="fa-solid fa-gamepad"></i>
Differential Game-Based Controller </h1>

**GitHub:** <https://github.com/alibaniasad1999/bachelor-thesis>

---


![](/assets/images/LQDG_abs.png)

---

## 🎓 Abstract

In this study, a quadcopter stand with three degrees of freedom (3‑DoF) is controlled using a differential‑game framework. **Player 1** tracks the reference commands, while **Player 2** injects worst‑case disturbances. The Nash‑equilibrium solution yields a robust Linear Quadratic Integral Differential Game (LQIDG) controller, providing strong disturbance rejection and tolerance to model uncertainty. Performance is verified in MATLAB Simulink and on a physical 3‑DoF platform.

**Keywords**: Quadcopter • Differential Game • Nash Equilibrium • LQDG • LQIDG • Model‑Based Design

---

## 🛠️ Plant Description

<p align="center"><img width="70%" src="https://user-images.githubusercontent.com/37424536/184509120-5035c89a-928c-46b6-b8d4-de49a87b5299.png" alt="3‑DoF Quadrotor Stand"/></p>

---

## 🎮 Differential Game Control

### Linear Quadratic Differential Game (LQDG)

The coupled Riccati equations are

$$
\begin{aligned}
\dot K_1 &= -A^\top K_1 - K_1 A - Q_1 + K_1 S_1 K_1 + K_1 S_2 K_2\\
\dot K_2 &= -A^\top K_2 - K_2 A - Q_2 + K_2 S_2 K_2 + K_2 S_1 K_1
\end{aligned}
$$

with optimal controls

$$
  u_i(t) = -R_{ii}^{-1} B_i^{\top} K_i(t) x(t), \quad i=1,2.
$$

### Linear Quadratic **Integral** Differential Game (LQIDG)

Integral action augments the state:

$$
  x_a = \begin{bmatrix} x_d - x \\ \displaystyle \int (y_d - y) \end{bmatrix}
$$

State matrices

$$
  A_a = \begin{bmatrix} A & 0 \\ C & 0 \end{bmatrix},\quad B_a = \begin{bmatrix} B \\ 0 \end{bmatrix},\quad C = I.
$$

Coupled Riccati equations

$$
\begin{aligned}
\dot K_{a1} &= -A^\top K_{a1} - K_{a1} A - Q_{a1} + K_{a1} S_{a1} K_{a1} + K_{a1} S_{a2} K_{a2}\\
\dot K_{a2} &= -A^\top K_{a2} - K_{a2} A - Q_{a2} + K_{a2} S_{a2} K_{a2} + K_{a2} S_{a1} K_{a1}
\end{aligned}
$$

Control law

$$
  u_i(t) = -R_{ii}^{-1} B_{ai}^{\top} K_{ai}(t) x_a(t), \quad i=1,2.
$$

---

## 📐 Quadcopter Stand Model

The nonlinear dynamics follow

$\dot x = f(x,\omega)$

with

$$
 f = \begin{bmatrix}
 x_4 + x_5\sin x_1\tan x_2 + x_6\cos x_1\tan x_2\\[2pt]
 x_5\cos x_1 - x_6\sin x_1\\[2pt]
 (x_5\sin x_1 + x_6\cos x_1)\sec x_2\\[4pt]
 A_1\cos x_2\sin x_1 + A_2 x_5 x_6 + A_3\sigma_1 + A_4 x_5 \sigma_4 - \operatorname{sgn}(x_4)A_5 + A_6\cos x_1\\[4pt]
 B_1\sin x_2 + B_2 x_4 x_6 + B_3\sigma_2 + B_4 x_4 \sigma_4 - \operatorname{sgn}(x_5)B_5 + B_6\cos x_2\\[4pt]
 C_1 x_4 x_5 + C_2 \sigma_3 - \operatorname{sgn}(x_6) C_3
 \end{bmatrix}
$$

Full coefficient definitions are retained from the original manuscript.

---

## 🧪 Simulation in MATLAB Simulink

**Model overview**

<p align="center"><img width="500" src="https://user-images.githubusercontent.com/37424536/177053082-635a8796-2a62-443e-8793-926f9a43eb4d.png" alt="Simulink Model"/></p>

**ODE45 Integrator**

<p align="center"><img width="500" src="https://user-images.githubusercontent.com/37424536/177053080-08d47018-dcad-48b3-8843-367c3c2b8f4e.png" alt="Integrator"/></p>

**All six channels**

<p align="center"><img width="500" src="https://user-images.githubusercontent.com/37424536/177053072-ddd34d85-ff92-44be-b623-dfd590661819.png" alt="All channels"/></p>

---

## 🚀 Simulation Results with LQIDG

**Roll vs Pitch**

|                                                    Roll                                                    |                                                    Pitch                                                   |
| :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| ![](https://user-images.githubusercontent.com/37424536/177053906-10043543-7b4d-4ee3-ac61-c17e14789df3.png) | ![](https://user-images.githubusercontent.com/37424536/177053851-71be0275-7cd6-424b-ba56-b69b94fe0a41.png) |

**Yaw**

<p align="center"><img width="60%" src="https://user-images.githubusercontent.com/37424536/177053905-824123af-e7e3-476a-96cd-f4fcb82dae5c.png"/></p>

**Motor Commands**

|                                                   Motor 1                                                  |                                                   Motor 2                                                  |
| :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| ![](https://user-images.githubusercontent.com/37424536/177054364-16d4b1b9-862e-4d42-964a-ba171d085fef.png) | ![](https://user-images.githubusercontent.com/37424536/177054367-68e700b5-6e78-4ad0-97f7-68ecd7c5af77.png) |
|                                                   Motor 3                                                  |                                                   Motor 4                                                  |
| ![](https://user-images.githubusercontent.com/37424536/177054369-81e79e8a-e704-4595-bbe2-a3de13d64832.png) | ![](https://user-images.githubusercontent.com/37424536/177054372-3fb6b099-ba70-4eab-b224-06d1e5d9dfa6.png) |

---

## ✅ Final 3‑DoF Test (Hardware)

|                                                    Roll                                                    |                                                    Pitch                                                   |
| :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| ![](https://user-images.githubusercontent.com/37424536/177053886-b2a01459-61f8-42fe-b19b-a17003adf53c.png) | ![](https://user-images.githubusercontent.com/37424536/177053893-44b0d95f-0328-4bb0-b74d-10227e85ab36.png) |

**Yaw**

<p align="center"><img width="60%" src="https://user-images.githubusercontent.com/37424536/177053905-824123af-e7e3-476a-96cd-f4fcb82dae5c.png"/></p>

**Motor Commands (Hardware)**

|                                                   Motor 1                                                  |                                                   Motor 2                                                  |
| :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| ![](https://user-images.githubusercontent.com/37424536/177054344-c924c746-9063-49e4-93c0-031d27ea1480.png) | ![](https://user-images.githubusercontent.com/37424536/177054347-25d75f38-2d9a-4d2e-8b65-f79a35c8bf3e.png) |
|                                                   Motor 3                                                  |                                                   Motor 4                                                  |
| ![](https://user-images.githubusercontent.com/37424536/177054349-6fe3bf2e-6f5e-4da5-97d0-59ae7cf91fac.png) | ![](https://user-images.githubusercontent.com/37424536/177054352-71a75642-0633-4c67-b7df-235341d2ccd7.png) |

---

## 📺 Video

<p align="center">
  <iframe width="70%" height="400" src="https://www.youtube.com/embed/SXZACxGaE1A?si=2NixTOUAsghqOm_X" title="Demo video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

---

## 📜 License

This project is licensed under the [MIT License](LICENSE.md).

**Author**: [Ali BaniAsad](https://www.linkedin.com/in/ali-baniasad-a50b27173/)
---

## 📚 Citation

If you use this work, please cite:

```bibtex
@article{BANIASAD2024515,
  title     = {Attitude control of a 3-DoF quadrotor platform using a linear quadratic integral differential game approach},
  journal   = {ISA Transactions},
  volume    = {148},
  pages     = {515-527},
  year      = {2024},
  issn      = {0019-0578},
  doi       = {https://doi.org/10.1016/j.isatra.2024.03.005},
  author    = {Ali BaniAsad and Reza Pordal and Alireza Sharifi and Hadi Nobahari}
}
```






