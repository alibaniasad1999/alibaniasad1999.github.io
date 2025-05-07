---
layout: post
title: Multi-Agent RL
description: Multi-agent Reinforcing Learning based on Zero-sum Same.
image: "/assets/images/multi-agent-light.jpeg"
order: 1
---

<h1><i class="fa-solid fa-chess"></i>  Multi-Agent Reinforcement-Learning</h1>
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




**GitHub:** <https://github.com/alibaniasad1999/master-thesis>

A research sandbox that marries a high-fidelity nonlinear simulator with four state-of-the-art continuous-action RL agents, all wired for **multi-agent, zero-sum play**.  
<!-- centred, autoplaying demo video -->
<div style="text-align:center;">
  <video
      src="/assets/video/MARL.mp4"
      width="640" height="360"
      autoplay muted loop playsinline
      style="display:block; margin:0 auto;">
    <!-- Fallback text for very old browsers -->
    Your browser doesn’t support HTML5 video.  
    <a href="/assets/video/MARL.mp4">Download the clip</a>.
  </video>
</div>
Swap agents with a flag, flip between cooperative and adversarial reward structures, and benchmark straight away.

| Agent | Multi-agent flavour | Why it’s interesting |
|-------|--------------------|----------------------|
| **DDPG** | Deep Deterministic Policy Gradient re-cast as a *differential game* | Treats every disturbance or competing vehicle as a second player; converges to Nash strategies while keeping the lean inference footprint of vanilla DDPG |
| **TD3** | Twin critics & target-policy smoothing | Accurate value estimates stop either player from *over-optimistically* exploiting the other—great for tightly coupled pursuit-evasion |
| **SAC** | Entropy-regularised actor-critic | Adds a principled exploration drive; agents discover robust manoeuvres where pure reward-greedy play would stalemate |
| **PPO** | Clipped surrogate objective | On-policy updates thrive in fast-changing opponent strategies; simplest to tune when rewards are sparse or delayed |

---

## Why multi-agent & zero-sum?

Many real-world control problems are effectively games:

* **Pursuit-evasion** – interceptor vs. target aircraft, autonomous car vs. pedestrian prediction  
* **Disturbance rejection** – controller vs. nature; treat wind-gusts or hardware faults as an adversary  
* **Competitive resource allocation** – multiple robots vying for the same power or bandwidth budget  

Model-free RL lifts the need for hand-crafted opponent models; differential-game extensions push agents toward robust **Nash equilibria**, not brittle one-shot optima.

---

## Reinforcement Learning — quick primer

Reinforcement learning (RL) is a paradigm in which an *agent* discovers an optimal control policy by **interacting** with an *environment* and maximising **cumulative reward**.

### Fundamentals

At each discrete time $t$ the agent:

1. **Observes** a state $s_t$  
2. **Acts** using policy $a_t\sim\pi_\theta(\,\cdot\,\mid s_t)$  
3. **Receives** a reward $r_t$ and the next state $s_{t+1}$

This loop repeats until a *terminal* condition resets the episode.  
Conceptually, the environment, agent, and action align with the classic control terms *plant*, *controller*, and *control input*.

<!-- centred, smaller critic-network figure -->
<div style="text-align:center;">
  <img src="/assets/images/rl.png"
       alt="Critic network (value)."
       width="380"           
       style="display:block;margin:0 auto;">
  <p>The agent–environment process in a Markov decision process.</p>
</div>

Mathematically, the problem is cast as a **Markov Decision Process (MDP)**  
$\langle S,A,P,r,q_0,\gamma\rangle$:

* $S,\;A$ – state and action sets  
* $P(s'\mid s,a)$ – transition kernel  
* $r(s)\in\mathbb R$ – reward  
* $q_0$ – initial-state distribution  
* $\gamma\in[0,1]$ – discount factor

The agent seeks to maximise the **expected return**

$$
G_t=\sum_{k=t+1}^{T}\gamma^{\,k-t-1}r_k.
$$

Value functions formalise “how good” a state or action is:

$$
\begin{aligned}
V^\pi(s_t) &=\mathbb E_\pi\Bigl[G_t\mid s_t\Bigr],\\[2pt]
Q^\pi(s_t,a_t) &=\mathbb E_\pi\Bigl[G_t\mid s_t,a_t\Bigr].
\end{aligned}
$$


---

<!-- ## Typical workflow

1. **Choose a game style** – pursuit-evasion, mix-cooperative, disturbance-injection  
2. **Select an agent pair** – pit TD3 against SAC, or run self-play with DDPG  
3. **Train → Evaluate → Compare** on reward, constraint violations, re-planning latency

Actors are deterministic at test time—policies reduce to matrix multiplies; no iterative solvers or lookup tables. -->

<!-- --- -->

## Highlights

<!-- * **3-D pursuit-evasion:** TD3 captures the evader 12 % faster than SAC; SAC invents evasive spirals unseen in scripted tactics   -->
* **Robust control:** DDPG shrugs off ±25 % actuator bias that destabilises single-agent PPO  
* **Generalisation:** All agents keep > 90 % reward when dynamics parameters shift by ±10 %

Full figures, videos, and interactive notebooks live in the GitHub Pages docs.

---

## Algorithms

#### DDPG Algorithm

The Deep Deterministic Policy Gradient Differential Game (DDPG) algorithm is implemented using two neural networks for each player: the actor network \( \pi_{\theta}(s) \) and the critic network \( Q_{\theta}(s, a) \). These networks are trained using the following algorithm:

Algorithm 1: Deep Deterministic Policy Gradient

* Input: initial policy parameters $\theta_1$, $\theta_2$, Q-function parameters $\phi_1$, $\phi_2$, empty replay buffer $\mathcal{D}$
* Set target parameters equal to main parameters $\theta_{\text{targ},1} \leftarrow \theta_1$, $\theta_{\text{targ},2} \leftarrow \theta_2$, $\phi_{\text{targ},1} \leftarrow \phi_1$, $\phi_{\text{targ},2} \leftarrow \phi_2$
* Repeat:
    * Observe state $s$
    * Select action for player 1: $a_1 = \text{clip}(\mu_{\theta_1}(s) + \epsilon_1, a_{Low}, a_{High})$, where $\epsilon_1 \sim \mathcal{N}$
    * Select action for player 2: $a_2 = \text{clip}(\mu_{\theta_2}(s) + \epsilon_2, a_{Low}, a_{High})$, where $\epsilon_2 \sim \mathcal{N}$
    * Execute actions $(a_1, a_2)$ in the environment.
    * Observe next state $s'$, reward pair $(r_1, r_2)$ for both players, and done signal $d$
    * Store transition $(s, a_1, a_2, r_1, r_2, s', d)$ in replay buffer $\mathcal{D}$
    * If $s'$ is terminal:
        * Reset environment state.
    * If it's time to update:
        * For j in range (however many updates):
            * Randomly sample a batch of transitions, $B = \{ (s, a_1, a_2, r_1, r_2, s', d) \}$ from $\mathcal{D}$
            * Compute targets for both players:
                * $y_1 = r_1 + \gamma (1 - d) Q_{\phi_{\text{targ},1}}(s', \mu_{\theta_{\text{targ},1}}(s'), \mu_{\theta_{\text{targ},2}}(s'))$
                * $y_2 = r_2 + \gamma (1 - d) Q_{\phi_{\text{targ},2}}(s', \mu_{\theta_{\text{targ},1}}(s'), \mu_{\theta_{\text{targ},2}}(s'))$
            * Update Q-functions for both players by one step of gradient descent:
                * $\nabla_{\phi_1}\,
\frac{1}{|B|}
\sum_{(s,a_1,a_2,r_1,s^{\prime},d)\in B}
\bigl(Q_{\phi_1}(s,a_1,a_2)\;-\;y_1\bigr)^{2}$
                * $\nabla_{\phi_2}\,
\frac{1}{|B|}
\sum_{(s,a_1,a_2,r_2,s^{\prime},d)\in B}
\bigl(Q_{\phi_2}(s,a_1,a_2)\;-\;y_2\bigr)^{2}$
            * Update policies for both players by one step of gradient ascent:
                * $\nabla_{\theta_1}\,
\frac{1}{|B|}
\sum_{s\in B}
Q_{\phi_1}\bigl(s,\mu_{\theta_1}(s),\mu_{\theta_2}(s)\bigr)$
                * $\nabla_{\theta_2}\,
\frac{1}{|B|}
\sum_{s\in B}
Q_{\phi_2}\bigl(s,\mu_{\theta_1}(s),\mu_{\theta_2}(s)\bigr)$
            * Update target networks for both players:
                * $\phi_{\text{targ},1} \leftarrow \rho \phi_{\text{targ},1} + (1 - \rho) \phi_1$
                * $\phi_{\text{targ},2} \leftarrow \rho \phi_{\text{targ},2} + (1 - \rho) \phi_2$
                * $\theta_{\text{targ},1} \leftarrow \rho \theta_{\text{targ},1} + (1 - \rho) \theta_1$
                * $\theta_{\text{targ},2} \leftarrow \rho \theta_{\text{targ},2} + (1 - \rho) \theta_2$
* Until convergence

#### TD3 Algorithm (Twin Delayed Deep Deterministic Policy Gradient, Multi-Agent Zero-Sum)

* **Input:** initial policy parameters $\theta_1,\theta_2$, twin-critic parameters  
  $\{\phi_{1,1},\phi_{1,2}\}$ and $\{\phi_{2,1},\phi_{2,2}\}$, empty replay buffer $\mathcal D$
* **Set targets:**  
  $\theta_{\text{targ},i}\leftarrow\theta_i,\;\;
   \phi_{\text{targ},i,j}\leftarrow\phi_{i,j}\quad (i\in\{1,2\},\,j\in\{1,2\})$
* **Repeat**
  * Observe state $s$
  * **Action selection**  
    $a_i=\operatorname{clip}\bigl(\mu_{\theta_i}(s)+\epsilon_i,\;a_{\min},a_{\max}\bigr),\;
      \epsilon_i\sim\mathcal N\quad (i=1,2)$
  * Execute $(a_1,a_2)$; observe $s'$, reward pair $(r,-r)$, done $d$
  * Store $(s,a_1,a_2,r,s',d)$ in $\mathcal D$
  * **Every** $M$ **steps do:** (for each update iteration $j$)
    * Sample mini-batch $B\subset\mathcal D$
    * **Target actions (policy smoothing)**  
      $\tilde a_i = \operatorname{clip}\bigl(\mu_{\theta_{\text{targ},i}}(s') +  
      \operatorname{clip}(\eta_i,-c,c),\,a_{\min},a_{\max}\bigr),\;\eta_i\sim\mathcal N$
    * **Target Q-values** (use *minimum* of twins)  
      $y = r + \gamma(1-d)\,\min_{j}\,Q_{\phi_{\text{targ},1,j}}\bigl(s',\tilde a_1,\tilde a_2\bigr)$  
      (player 2 receives $-y$)
    * **Critic updates** $(j=1,2)$:  
      $\nabla_{\phi_{i,j}}\;\frac1{|B|}\sum_{B}\bigl(Q_{\phi_{i,j}}(s,a_1,a_2)-\sigma_i\,y\bigr)^2$  
      with $\sigma_1=+1,\;\sigma_2=-1$
    * **Delayed actor update** (every $d_{\text{policy}}$ iterations)  
      $\nabla_{\theta_i}\;\frac1{|B|}\sum_{s\in B}Q_{\phi_{i,1}}(s,\mu_{\theta_1}(s),\mu_{\theta_2}(s))$
    * **Target-network Polyak averaging**  
      $\phi_{\text{targ},i,j}\leftarrow\tau\phi_{i,j}+(1-\tau)\phi_{\text{targ},i,j}$  
      $\theta_{\text{targ},i}\leftarrow\tau\theta_i+(1-\tau)\theta_{\text{targ},i}$
* **Until convergence**


#### SAC Algorithm (Soft Actor-Critic, Multi-Agent Zero-Sum)

* **Input:** policy parameters $\theta_1,\theta_2$, twin critics $\{\phi_{1,1},\phi_{1,2}\}$,  
  $\{\phi_{2,1},\phi_{2,2}\}$, temperature parameters $\alpha_1,\alpha_2$, replay buffer $\mathcal D$
* Initialise target critics $\phi_{\text{targ},i,j}\leftarrow\phi_{i,j}$
* **Repeat**
  * Observe state $s$
  * **Sample actions** (re-parameterisation):  
    $a_i=\tanh\bigl(\mu_{\theta_i}(s)+\sigma_{\theta_i}(s)\,\epsilon_i\bigr),\;\epsilon_i\sim\mathcal N$
  * Execute $(a_1,a_2)$; observe $s'$, reward $(r,-r)$, done $d$
  * Store transition in $\mathcal D$
  * **For** $j=1\ldots N_{\text{updates}}$:
    * Sample mini-batch $B$
    * **Target value with entropy bonus**  
      $\tilde a_i'\sim\pi_{\theta_i}(s'),\quad  
       \hat Q_{i}(s',\tilde a_1',\tilde a_2')=\min_{k}Q_{\phi_{\text{targ},i,k}}(s',\tilde a_1',\tilde a_2')$
    * $y = r + \gamma(1-d)\bigl(\hat Q_{1}(s',\cdot) - \alpha_1\log\pi_{\theta_1}(\tilde a_1'|s')\bigr)$  
      (player 2 uses $-y$ with $\alpha_2$)
    * **Critic losses**  
      $\mathcal L_{\phi_{i,k}}=\frac1{|B|}\sum_{B}\bigl(Q_{\phi_{i,k}}(s,a_1,a_2)-\sigma_i\,y\bigr)^2$
    * **Policy losses**  
      $\mathcal L_{\theta_i}=\frac1{|B|}\sum_{s\in B}  
        \bigl(\alpha_i\log\pi_{\theta_i}(a_i|s)-Q_{\phi_{i,1}}(s,a_1,a_2)\bigr)$
    * **Temperature update** (optional, per player)  
      $\nabla_{\alpha_i}\;\alpha_i\bigl(-\log\pi_{\theta_i}(a_i|s)-\mathcal H_\text{target}\bigr)$
    * **Target critics**  
      $\phi_{\text{targ},i,k}\leftarrow\tau\phi_{i,k}+(1-\tau)\phi_{\text{targ},i,k}$
* **Until convergence**


#### PPO Algorithm (Proximal Policy Optimisation, Multi-Agent Zero-Sum)

* **Input:** policy parameters $\theta_1,\theta_2$, critic parameters $\psi_1,\psi_2$
* **Repeat**
  * **Collect trajectories** for $T$ steps using current policies $\pi_{\theta_1},\pi_{\theta_2}$
  * For each step $t$ compute  
    * **Returns:** $G_t^1 = \sum_{k\ge t}\gamma^{k-t}r_k$, $G_t^2=-G_t^1$
    * **Advantages:**  
      $A_t^i = G_t^i - V_{\psi_i}(s_t)$
  * **For** $K$ **epochs**, minibatch over collected data:
    * **Ratio:**  
      $r_t^i(\theta) = \dfrac{\pi_{\theta_i}(a_t|s_t)}{\pi_{\theta_{i,\text{old}}}(a_t|s_t)}$
    * **Clipped objective:**  
      $\mathcal L_{\theta_i}=  
        \frac1{|B|}\sum_{t\in B}\min\bigl(r_t^iA_t^i,\;\operatorname{clip}(r_t^i,1-\epsilon,1+\epsilon)A_t^i\bigr)$
    * **Critic loss:**  
      $\mathcal L_{\psi_i}= \frac1{|B|}\sum_{t\in B}\bigl(V_{\psi_i}(s_t)-G_t^i\bigr)^2$
    * **Update** $\theta_i$ and $\psi_i$ via gradient ascent / descent


### Notation key
* $\theta_i$ — actor parameters for player $i$  
* $\phi_{i,j}$ — $j$-th Q-critic for player $i$ (TD3/SAC)  
* $\psi_i$ — state-value net for player $i$ (PPO)  
* $\gamma$ — discount factor   $\tau$ — Polyak coefficient   $\epsilon$ — PPO clip range  

---
### Actor–critic frameworks & neural networks

Most modern continuous-control algorithms are **actor–critic**:  

* **Actor** $\pi_{\theta}(a\mid s)$ – the policy  
* **Critic** $Q_{\phi}$ or $V_{\psi}$ – estimates return

Both are neural networks (fully-connected, ReLU) trained with gradient-based updates.

<!-- centred, smaller critic-network figure -->
<div style="text-align:center;">
  <img src="/assets/images/actor.png"
       alt="Actor network (policy)."
       width="380"           
       style="display:block;margin:0 auto;">
  <p>Critic network (value).</p>
</div>

<!-- centred, smaller critic-network figure -->
<div style="text-align:center;">
  <img src="/assets/images/critic.png"
       alt="Critic network (value)."
       width="380"           
       style="display:block;margin:0 auto;">
  <p>Critic network (value).</p>
</div>

