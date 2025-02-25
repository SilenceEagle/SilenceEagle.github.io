---
title: "一种基于深度学习的光纤传感水声信号识别方法及装置"
authors: "高嘉豪;彭威;<b>刘泽超</b>;王皓;马玲梅;饶云江;叶松涛."
collection: patents
permalink: /patents/2022-07-01-patents-ofs-recognition
applicationDate: 2022-07-01
issueDate: 2022-09-16
number: "CN202210763891.0"
excerpt: '本发明涉及一种基于深度学习的光纤传感水声信号识别方法'
---
# 摘要

本发明提供一种基于深度学习的光纤传感水声信号识别方法,该方法降低了光纤传感水声信号识别的难度,通过最优聚类模型,将无监督学习方式转化为有监督学习的方式,使识别未知的目标事件信号成为可能；以光纤传感系统自身固有噪声信号分解分量作为训练数据,构建开集识别网络,可用于识别任意不属于系统噪声的目标事件信号,有效提高了模型的泛化能力。

# 主权项：

1.一种基于深度学习的光纤传感水声信号识别方法,其特征在于,包括以下步骤：S1、构建最优聚类模型,将不含未知的目标事件信号的模态分量数据输入模型,得到不含未知的目标事件信号的模态分量数据的最优聚类结果；将含有未知的目标事件信号的模态分量数据输入模型,得到含有未知的目标事件信号的模态分量数据的最优聚类结果；S1具体包括如下子步骤：S11、从含有噪声信号的光纤上获取n个光纤传感水声信号数据；从含有噪声信号和未知的目标事件信号的光纤上获取n个光纤传感水声信号数据；n为正整数；S12、利用变分模态分解算法分解上述的光纤传感水声信号数据,得到个模态分量数据,利用变分模态分解算法分解上述的光纤传感水声信号数据,得到个模态分量数据；m为正整数；S13、将S12中所得到的模态分量数据和分别作为最优聚类模型的训练样本,其中,分别得到两种不同数据的最优聚类结果；其中最优聚类模型构建过程如下：将聚类簇个数从2至进行取值,为正整数,然后每一次取值后采用K均值聚类算法,通过随机选取个聚类质心点,其中,对于每个样本通过计算其与聚类质心点的欧氏距离,判断其应该属于的簇,重新计算每个簇的重心,将其定义为新的聚类质心点,重复以上过程,直到输出簇划分,采用Calinski-Harabaz算法与Silhouette-Coefficient算法相结合的方式对每一次聚类结果进行评价得分；聚类簇个数从2至依次取值后,可以得到不同聚类簇个数下聚类结果的得分,比较个得分,选取得分最高的聚类簇个数的聚类结果作为最优聚类结果,最优聚类结果的类别个数；S2、构建卷积神经网络,将S1中不含未知的目标事件信号的模态分量数据的最优聚类结果作为训练数据输入到卷积神经网络中,对卷积神经网络进行训练；S3、将S2中训练数据通过训练好的卷积神经网络进行预测,得到预测正确的训练样本的线性层特征向量；S4、使用极大值理论分析中的韦伯分布来拟合S3中得到的特征向量,得的拟合分布模型；S4具体为：将所有预测正确的训练样本的线性层特征向量,根据S13中最优聚类结果的个类别将其对应分开,分别计算个类别对应向量的均值作为该类别的中心,其中,分别计算第类中每条预测正确的样本线性层特征向量和其类别对应的均值间的欧式距离,其中表示第类中第个样本；将进行排序,对排序后的几个尾部极大值进行极大值理论分析,使用韦伯分布来拟合距离排序中的尾部极大值,得到一个拟合分布模型；S5、采用开集识别领域中的OpenMax方法作为卷积神经网络的输出层,含有未知的目标事件信号的模态分量数据的最优聚类结果作为测试数据输入卷积神经网络,得到最后的分类结果；S5具体为：将模态分量数据的最优聚类结果作为测试数据,通过训练好的卷积神经网络进行预测,得到每条测试样本的线性层特征向量,然后使用每个第类对应的拟合分布模型对其进行预测,分别得到属于已知的多个类的概率和未知类的概率。
