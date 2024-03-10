---
title: "Deep Hyperspherical Clustering for Skin Lesion Medical Image Segmentation"
authors: Zuowei Zhang, Songtao Ye, <b>Zechao Liu</b>, Hao Wang*, Weiping Ding*.
collection: publications
permalink: /publication/2023-01-27-paper-jbhi
excerpt: 'This paper investigates a new deep hyperspherical clustering (DHC) method for skin lesion medical image segmentation by combining deep convolutional neural networks and the theory of belief functions (TBF).'
date: 2023-01-27
venue: 'IEEE Journal of Biomedical and Health Informatics'
paperurl: 'https://ieeexplore.ieee.org/document/10026862'
citation: 'Zhang, Zuowei, Ye, Songtao, Liu, Zechao, et al. "Deep hyperspherical clustering for skin lesion medical image segmentation." <i>IEEE Journal of Biomedical and Health Informatics</i> (2023).'
---
![JBHI](https://ieeexplore.ieee.org/ielx7/6221020/10210140/10026862/graphical_abstract/jbhi-gagraphic-3240297.jpg)

Diagnosis of skin lesions based on imaging techniques remains a challenging task because data (knowledge) uncertainty may reduce accuracy and lead to imprecise results. This paper investigates a new deep hyperspherical clustering (DHC) method for skin lesion medical image segmentation by combining deep convolutional neural networks and the theory of belief functions (TBF). The proposed DHC aims to eliminate the dependence on labeled data, improve segmentation performance, and characterize the imprecision caused by data (knowledge) uncertainty. First, the SLIC superpixel algorithm is employed to group the image into multiple meaningful superpixels, aiming to maximize the use of context without destroying the boundary information. Second, an autoencoder network is designed to transform the superpixels' information into potential features. Third, a hypersphere loss is developed to train the autoencoder network. The loss is defined to map the input to a pair of hyperspheres so that the network can perceive tiny differences. Finally, the result is redistributed to characterize the imprecision caused by data (knowledge) uncertainty based on the TBF. The proposed DHC method can well characterize the imprecision between skin lesions and non-lesions, which is particularly important for the medical procedures. A series of experiments on four dermoscopic benchmark datasets demonstrate that the proposed DHC yields better segmentation performance, increasing the accuracy of the predictions while can perceive imprecise regions compared to other typical methods.
