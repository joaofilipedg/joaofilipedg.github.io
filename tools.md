---
layout: page
title: Tools
permalink: /tools/
---

<h3><span>gpuPTXModel</span> - <i>GPU Static Modeling using PTX and Deep Structured Learning</i></h3>

![PTX Model Diagram](/assets/model_ptx.png)

``gpuPTXModel`` is a command line tool that allows creating DVFS-aware GPU static models based solely on the sequence of [PTX](https://docs.nvidia.com/cuda/parallel-thread-execution/index.html) instructions in the kernel code.
The proposed models, published in [IEEE Access](https://ieeexplore.ieee.org/document/8890640), implemented using recurrent neural networks (*LSTM*-based), take into account the sequence of GPU assembly instructions and can be used to accurately predict changes in the execution time, power and energy consumption of applications when the frequencies of different GPU domains (core and memory) are scaled.

<h3><span>gpmTOOL</span> - <i>GPU Runtime Power Modelling Tool</i></h3>

![PTX Model Diagram](/assets/model_ptx.png)

``gpmTOOL`` is a command line tool that allows creating DVFS-aware GPU static models based solely on the sequence of [PTX](https://docs.nvidia.com/cuda/parallel-thread-execution/index.html) instructions in the kernel code.
The proposed models, published in [IEEE Access](https://ieeexplore.ieee.org/document/8890640), implemented using recurrent neural networks (*LSTM*-based), take into account the sequence of GPU assembly instructions and can be used to accurately predict changes in the execution time, power and energy consumption of applications when the frequencies of different GPU domains (core and memory) are scaled.