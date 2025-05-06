---
layout: post
title: Project 4
description: another project
---

Example modified from [here](http://www.unexpected-vortices.com/sw/rippledoc/quick-markdown-example.html){:target="_blank"}.

H1 Header
============

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists
look like:

  * this one
  * that one
  * the other one

Note that the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.


H2 Header
------------

Here's a numbered list:

 1. first item
 2. second item
 3. third item

Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here's a code sample:

    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:

~~~
define foobar() {
    print "Welcome to flavor country!";
}
~~~

(which makes copying & pasting easier). You can optionally mark the
delimited block for Pandoc to syntax highlight it by specifying the languagae after the start of a block (e.g. `~~~python`) which would look like :

~~~python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print(i)
~~~

### An H3 header ###

Now a nested list:

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).

Here's a footnote [^1].

[^1]: Some footnote text.

Tables can look like this:

| Header 1 | Header 2                   | Header 3 |
|:--------:|:--------------------------:|:--------:|
| data1a   | Data is longer than header | 1        |
| d1b      | add a cell                 |          |
| lorem    | ipsum                      | 3        |
|          | empty outside cells        |          |
| skip     |                            | 5        |
| six      | Morbi purus                | 6        |


A horizontal rule follows.

***

Here's a definition list:

apples
  : Good for making applesauce.

oranges
  : Citrus!

tomatoes
  : There's no "e" in tomatoe.

Again, text is indented 4 spaces. (Put a blank line between each
term and  its definition to spread things out more.)

Here's a "line block" (note how whitespace is honored):

| Line one
|   Line too
| Line tree

and images can be specified like so:

![example image](https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=300&h=300&fit=crop "An exemplary image")

Inline math equation: $\omega = d\phi / dt$. Display
math should get its own line like so:

$$I = \int \rho R^{2} dV$$



# INS-AI

A collection of sensor-fusion and machine-learning modules for an Unmanned Surface Vehicle (USV) platform.  
This project includes GPS/INS integration, predictive deep-learning models, hyperparameter tuning scripts, and data-generation utilities.

![](/assets/images/graphical_abstract.png)

---

## Table of Contents

- [Features](#features)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
- [Usage](#usage)  
  - [Jupyter Notebooks](#jupyter-notebooks)  
  - [MATLAB Scripts](#matlab-scripts)  
  - [PureBasic Demos](#purebasic-demos)  
- [Repository Structure](#repository-structure)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- **GPS_INS**  
  Sensor fusion of GPS and Inertial Navigation System data for improved positioning.
- **PNN**  
  Probabilistic Neural Network implementations for classification and regression tasks.
- **LSTM**  
  Long Short-Term Memory models for sequence prediction, path planning, and anomaly detection.
- **Tuning**  
  Hyperparameter-search routines (grid search, random search, Bayesian optimization) to optimize model performance.
- **data_created**  
  Scripts and notebooks for dataset generation, augmentation, and preprocessing.

---

## Getting Started

### Prerequisites

- **Python** 3.8 or higher  
- **Jupyter Notebook** or **JupyterLab**  
- **MATLAB** R2020b or later (for `.m` scripts)  
- **PureBasic** compiler (for PureBasic demos)

### Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/alibaniasad1999/otter-USV.git
   cd otter-USV
   ```

2. **(Optional) Create & activate a virtual environment**  
   ```bash
   python -m venv venv
   # Linux/macOS
   source venv/bin/activate  
   # Windows
   venv\Scripts\activate.bat
   ```

3. **Install Python dependencies**  
   ```bash
   pip install -r requirements.txt
   ```

---

## Usage

### Jupyter Notebooks

1. Launch Jupyter:  
   ```bash
   jupyter notebook
   # or
   jupyter lab
   ```
2. Open any `.ipynb` in the `GPS_INS/`, `PNN/`, `LSTM/`, `Tuning/`, or `data_created/` folders and run cells interactively.

### MATLAB Scripts

1. Open MATLAB.  
2. Navigate to the folder containing `.m` scripts.  
3. Run scripts cell-by-cell or as a whole to reproduce plots and analyses.

### PureBasic Demos

1. Open the `.pb` source files in PureBasic IDE.  
2. Compile and run to see real-time demos of sensor-fusion algorithms.

---

## Repository Structure

```
INS-AI/
├── GPS_INS/           # GPS + INS sensor-fusion notebooks & scripts
├── PNN/               # Probabilistic Neural Network implementations
├── LSTM/              # LSTM sequence prediction models
├── Tuning/            # Hyperparameter tuning utilities
├── data_created/      # Data generation & preprocessing scripts
├── .gitignore
├── LICENSE            # MIT License
├── README.md          # This file
└── requirements.txt   # Python dependencies
```

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository.  
2. **Create** a new branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add feature: YourFeatureName"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open** a Pull Request against the `main` branch.

Please ensure your code is well-documented, tested, and follows the existing style.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
