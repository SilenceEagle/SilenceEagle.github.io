---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---
{% include base_path %}

# 教育经历

* 硕士：西北工业大学（985，推免），自动化学院，控制科学与工程，模式识别与智能系统，2018.09~2021.03。
* 学士：长安大学（211），控制科学与工程学院，自动化，2014.09~2018.07。

# 工作经历

* 2021.04 ~ 今: 之江实验室 算法工程师

  * 工作内容：光纤传感数据（一维或二维时序数据）去噪、融合等。

# 技能

* 机器学习：

  * **理论**：
    - 熟悉可实现分类、聚类任务的**传统机器学习**方法；
    - 熟练掌握**卷积神经网络（CNN）**、**变分自编码（VAE）**、**生成对抗网络**等相关知识；
    - 熟悉**Transformer**相关知识。
  * **编程实现**：
    - 熟练使用**TensorFlow**（`2017.12`起开始使用至今）；
    - 熟练使用**Pytorch**（`2021.04`起使用至今）；
    - 熟悉**OpenCV**。
* 编程语言

  * **Python3**：熟练使用（`2017.04`起开始使用至今）；
  * **Matlab**：熟练使用（`2015.10`起使用至今）
  * **C**：曾经可熟练使用（逐页阅读完《C Primer》；计算机二级C语言成绩为“优秀”；2017年参与了“全国大学生电子设计竞赛”、“全国大学生智能车竟赛”等，我均负责使用 `C`语言编写单片机程序）；
  * **C++**： 曾经可熟练使用（上学期间学习的主要是 `visual C++` / `MFC`，2017年参与了“大学生创新创业项目”，我负责使用 `C++`语言编写上位机软件）。
* 其他：

  * **Latex**：熟练使用；
  * **Office（Word，Excel，PowerPoint）**：熟练使用；
  * **Photoshop**：简单操作。
  * **Premiere Pro**: 简单操作。

论文
====

<!-- {% assign count = 0 %} -->

<ol>{% for post in site.publications reversed %}
    <!-- {% capture count %}{{ count | plus:1 }}{% endcapture %} -->
    {% include archive-single-cv.html %}
  {% endfor %}</ol>

专利
====

<!-- {% assign count = 0 %} -->

<ol>{% for post in site.patents reversed %}
    <!-- {% capture count %}{{ count | plus:1 }}{% endcapture %} -->
    {% include archive-single-cv.html %}
  {% endfor %}</ol>

<!-- Talks
=====

<ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>

Teaching
========

<ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Service and leadership
======================

* Currently signed in to 43 different slack teams -->
