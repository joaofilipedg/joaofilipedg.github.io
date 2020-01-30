---
layout: page
title: Tools
permalink: /tools/
---

<h3><span>gpuPTXModel</span> - <i>GPU Static Modeling using PTX and Deep Structured Learning</i></h3>

![PTX Model Diagram](/assets/access_model.png)

``gpuPTXModel`` is a command line tool that allows creating DVFS-aware GPU static models based solely on the sequence of [PTX](https://docs.nvidia.com/cuda/parallel-thread-execution/index.html) instructions in the kernel code.
The proposed models, published in [IEEE Access](https://ieeexplore.ieee.org/document/8890640), implemented using recurrent neural networks (*LSTM*-based), take into account the sequence of GPU assembly instructions and can be used to accurately predict changes in the execution time, power and energy consumption of applications when the frequencies of different GPU domains (core and memory) are scaled.

<u><b>Paper:</b></u> <https://ieeexplore.ieee.org/document/8327055>.

<u><b>Open-source Tool:</b></u> <https://github.com/hpc-ulisboa/gpupowermodel>.

<h3><span>gpmTOOL</span> - <i>GPU Runtime Power Modelling Tool</i></h3>

![PTX Model Diagram](/assets/tpds_model.png)

``gpmTOOL`` is a command line tool for modelling the power consumption of a GPU device. The tool implements the iterative heuristic algorithm proposed in [[1]](#references) and [[2]](#references), initially presented in [HPCA'2018](https://youtu.be/ppsPx6zaC0U), to determine the unknown characteristics of GPU devices in order to estimate the GPU power consumption across an ample range of frequency and voltage configurations for the multiple GPU frequency domains.

<u><b>Paper:</b></u> <https://ieeexplore.ieee.org/document/8890640>.

<u><b>Open-source Tool:</b></u> <https://github.com/hpc-ulisboa/gpuPTXModel>.