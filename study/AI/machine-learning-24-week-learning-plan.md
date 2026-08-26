---
title: Machine Learning 由淺入深 24 週學習計畫
tags: [machine-learning, learning-plan, python, data-science, scikit-learn, deep-learning, ml-project]
created: 2026-08-26
summary: 給完全初學者的 24 週 Machine Learning 路線，以每週 8 小時逐步學習 Python、資料處理、數學直覺、傳統 ML、模型評估、非監督式學習、深度學習與端到端專題。
related: [study/AI/train-validation-test-split-in-skill-improvement.md, study/AI/note.md]
---

# Machine Learning 由淺入深 24 週學習計畫

## 適用對象與預設

- 對象：沒有 Machine Learning 經驗的初學者。
- 時間：每週約 8 小時，共 24 週；若每週只有 4 小時，可把每週內容拆成兩週。
- 目標：不只看懂名詞，而是能獨立完成資料清理、建模、評估、解釋與展示。
- 工具：Python、Jupyter Notebook、NumPy、pandas、Matplotlib／Seaborn、scikit-learn；深度學習階段再選 PyTorch 或 TensorFlow 其中一套。
- 原則：先建立直覺，再補公式；每學一個概念，就用小型資料集實作並留下可重跑的 Notebook。

## 每週固定節奏

| 活動 | 時數 | 做法 |
| --- | ---: | --- |
| 理論與範例 | 2 小時 | 理解問題、模型假設與核心詞彙，不追求一次讀完所有數學證明 |
| 跟做實作 | 3 小時 | 重新打一次範例，逐步觀察資料與模型輸出 |
| 小任務／專題 | 2 小時 | 換資料、改參數或回答一個真實問題，避免只複製教學 |
| 回顧 | 1 小時 | 寫下學到的概念、錯誤、仍不理解之處與下週調整 |

每週至少留下：一份可執行 Notebook、一段 5–10 句的學習摘要，以及一個自己能回答的檢查問題。

## 24 週 Roadmap

### 第一階段：Python 與資料基礎（第 1–5 週）

#### 第 1 週：認識 ML 與開發環境

- 分辨監督式學習、非監督式學習、分類、迴歸與分群。
- 建立 Python、Jupyter Notebook 與虛擬環境。
- 練習變數、條件、迴圈、函式與基本資料結構。
- 產出：讀入一份 CSV，顯示前幾列、欄位型別與基本統計。

#### 第 2 週：Python 資料處理

- 熟悉 list、dict、函式、模組、例外與檔案讀寫。
- 使用 NumPy 操作 array、shape、索引、向量化與基本統計。
- 產出：不用逐列迴圈，完成一組資料的標準化與摘要。

#### 第 3 週：pandas

- 練習 DataFrame 選取、篩選、排序、groupby、merge 與缺失值處理。
- 理解數值、類別、日期與文字欄位的差異。
- 產出：完成一份資料品質報告，列出缺失、重複、異常值與可能修正方式。

#### 第 4 週：資料視覺化與探索式分析

- 使用直方圖、散點圖、箱型圖與相關係數探索分布及關係。
- 練習先提出問題，再選圖表，不以圖表數量取代分析。
- 產出：一份包含 3–5 張圖與文字結論的 EDA Notebook。

#### 第 5 週：第一個資料專題

- 自選一份結構化資料，完成「問題 → 清理 → 探索 → 結論」。
- 不建複雜模型；重點是能清楚說明資料限制與分析依據。
- 階段驗收：能在不看教學的情況下讀取、清理、彙整並視覺化 CSV。

### 第二階段：必要數學直覺（第 6–8 週）

#### 第 6 週：線性代數直覺

- 理解向量、矩陣、內積、矩陣乘法與維度。
- 把一列資料視為特徵向量，把整份資料視為矩陣。
- 產出：用 NumPy 實作向量相似度與簡單線性預測。

#### 第 7 週：機率與統計直覺

- 理解平均、變異數、標準差、條件機率、常見分布、抽樣與信賴區間。
- 分辨相關與因果，認識 sampling bias 與 data leakage。
- 產出：用抽樣模擬觀察樣本大小如何影響估計穩定度。

#### 第 8 週：微積分與最佳化直覺

- 理解斜率、導數、梯度、loss function 與 gradient descent。
- 不要求完整證明，但要能解釋 learning rate 太大或太小的後果。
- 產出：從零實作一元線性迴歸的 gradient descent。
- 階段驗收：能用圖和白話解釋模型如何透過 loss 改善參數。

### 第三階段：監督式學習核心（第 9–12 週）

#### 第 9 週：ML 標準流程與線性迴歸

- 建立 feature、label、fit、predict、residual 與 baseline 的概念。
- 學會 Train／Validation／Test 分工，先切資料再進行會「學到資料」的處理。
- 使用 MAE、MSE、RMSE 與 R² 評估迴歸。
- 產出：房價或需求量預測 Notebook，並與簡單 baseline 比較。

#### 第 10 週：分類與 Logistic Regression

- 理解 probability、decision boundary 與 threshold。
- 使用 accuracy、precision、recall、F1、confusion matrix 與 ROC-AUC。
- 產出：二元分類 Notebook，解釋錯誤類型以及為何選擇某個指標。

#### 第 11 週：樹模型

- 學習 Decision Tree、Random Forest 與 Gradient Boosting 的核心直覺。
- 理解樹深、過度擬合、feature importance 及其限制。
- 產出：以相同資料比較線性模型、單棵樹與 ensemble。

#### 第 12 週：KNN、SVM 與模型選擇

- 理解距離、尺度、margin 與不同模型的 inductive bias。
- 練習從資料量、可解釋性、速度與表現選擇候選模型。
- 階段驗收：能建立 baseline，公平比較至少三個模型，並說明選擇理由。

### 第四階段：可靠評估與特徵工程（第 13–15 週）

#### 第 13 週：泛化與交叉驗證

- 理解 underfitting、overfitting、bias／variance 與 cross-validation。
- 使用 learning curve 判斷應增加資料、改善特徵或調整模型。
- 產出：比較單次切分與 K-fold 結果的穩定程度。

#### 第 14 週：前處理與 Pipeline

- 處理缺失值、類別編碼、特徵縮放與不平衡資料。
- 使用 scikit-learn Pipeline／ColumnTransformer，防止訓練與評估流程不一致。
- 產出：一條能從原始資料重跑到預測結果的 pipeline。

#### 第 15 週：調參、錯誤分析與解釋

- 使用 Randomized Search 或 Grid Search，但先固定評估方法與 baseline。
- 依子群、資料區段與錯誤類型分析失敗案例。
- 接觸 permutation importance、partial dependence 或 SHAP 的使用情境與限制。
- 階段驗收：能說明「模型在哪些情況會失敗」，而不只報一個總分。

### 第五階段：非監督式學習（第 16–18 週）

#### 第 16 週：分群

- 學習 K-means、hierarchical clustering 與 DBSCAN 的直覺與假設。
- 理解沒有 label 時，分群結果仍需用業務意義與穩定性驗證。
- 產出：客群或行為分群，替每群撰寫可解釋的 profile。

#### 第 17 週：降維

- 學習 PCA 的變異保留直覺，區分視覺化、壓縮與去雜訊目的。
- 認識 t-SNE／UMAP 適合探索視覺化，但圖上的距離不可過度解讀。
- 產出：比較原始特徵與 PCA 特徵對模型或視覺化的影響。

#### 第 18 週：異常偵測與小專題

- 認識 Isolation Forest、距離式方法與 threshold 設定。
- 產出：完成一個「分群、降維或異常偵測」小專題。
- 階段驗收：能說明無標籤結果如何被驗證，以及哪些結論不能下。

### 第六階段：深度學習入門（第 19–21 週）

#### 第 19 週：神經網路基礎

- 理解 neuron、layer、activation、forward pass、backpropagation、epoch 與 batch。
- 用小型表格資料建立 Multi-Layer Perceptron，與傳統模型比較。

#### 第 20 週：訓練與正則化

- 學習 optimizer、learning rate、dropout、weight decay、batch normalization 與 early stopping。
- 觀察 train／validation loss 曲線，判斷學習不足或過度擬合。
- 產出：記錄至少三組實驗及選擇最終設定的理由。

#### 第 21 週：選一種資料模態入門

- 影像方向：CNN、augmentation、transfer learning。
- 文字方向：embedding、sequence／attention 基本概念、預訓練模型的使用方式。
- 時序方向：lag、window、時間順序切分與避免未來資料洩漏。
- 階段驗收：能完成一個小型神經網路實驗，並說明它是否真的優於簡單 baseline。

### 第七階段：端到端 Capstone（第 22–24 週）

#### 第 22 週：定義問題與實驗設計

- 選一個自己在意的問題，定義使用者、預測目標、成功指標與限制。
- 建立資料字典、Train／Validation／Test 策略與最小 baseline。
- 先寫一頁專題計畫，避免一開始就堆模型。

#### 第 23 週：建模與錯誤分析

- 建立可重跑 pipeline，比較至少兩種合理模型。
- 記錄實驗設定、結果、失敗案例與資料風險。
- 只根據 validation 做決策；test 保留到最後一次正式評估。

#### 第 24 週：交付與回顧

- 用 test set 做最終評估，避免持續以 test 結果調參。
- 整理 README、環境需求、資料來源、Notebook／程式碼、結果與限制。
- 加分項：用 Streamlit、Gradio 或簡單 API 做可操作 demo。
- 最終驗收：另一個人能依 README 重現結果，並理解模型用途、限制與不適用情境。

## Capstone 題目建議

- 預測：房價、銷量、需求量或設備故障風險。
- 分類：客戶流失、垃圾郵件、評論情緒或事件優先級。
- 分群：客戶、產品、使用行為或文件主題。
- 異常偵測：網路流量、感測器、交易或系統指標。
- 影像／文字：小型影像分類、內部文件分類或 FAQ 意圖辨識。

優先選擇你熟悉的領域。資料和問題理解通常比使用更複雜的模型更能決定專題品質。

## 建議資源使用方式

- Python／資料：Python 官方教學、NumPy／pandas 官方入門與小型 Kaggle 資料集。
- 傳統 ML：scikit-learn User Guide 搭配《An Introduction to Statistical Learning》；每讀一章就完成一個 Notebook。
- 數學：以《Mathematics for Machine Learning》或視覺化教材補觀念，只學當前模型真正需要的部分。
- 深度學習：選 fast.ai、Dive into Deep Learning 或一門以 PyTorch／TensorFlow 為主的實作課程，避免同時學兩套框架。
- 查資料順序：官方文件 → 教科書／課程 → 社群文章；把社群文章當輔助說明，不當唯一依據。

## 卡關與調整規則

- Python 基礎不足：第 1–5 週延長到 8 週，不急著進模型。
- 數學卡關：回到圖像、數值模擬與模型輸出建立直覺，再補符號推導。
- 只會照抄：換一份資料，關掉教學後從空白 Notebook 重做。
- 指標很好但解釋不了：檢查 leakage、切分方式、重複資料與不平衡問題。
- 進度落後：保留每階段專題與驗收，刪減模型種類，不刪除實作與回顧。
- 想提早專精：至少完成第 15 週，再選 NLP、Computer Vision、推薦系統、時序或 MLOps。

## 完成後應具備的能力

- 把模糊需求轉成可評估的 ML 問題。
- 清理與探索結構化資料，建立可靠 baseline。
- 正確切分資料、選擇指標、避免 leakage，並比較模型。
- 透過 pipeline 重現前處理、訓練與預測。
- 分析錯誤與限制，知道何時不該使用 ML。
- 完成並展示一個有 README、實驗紀錄與最終評估的端到端專題。
