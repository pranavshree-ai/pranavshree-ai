<p align="center">
  <img src="assets/hero.svg" width="100%" alt="Pranav Jadhav — Machine Learning Engineer. LLMOps, MLOps, Generative AI and Deep Learning.">
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3200&pause=900&color=22D3EE&center=true&vCenter=true&width=760&lines=LLMOps+%C2%B7+MLOps+%C2%B7+Generative+AI;RAG+over+1M%2B+vectors+in+production;Evaluate+%E2%86%92+Detect+Drift+%E2%86%92+Fine-tune+%E2%86%92+Redeploy" alt="Typing animation: LLMOps, MLOps, Generative AI; RAG over 1M+ vectors; evaluate, detect drift, fine-tune, redeploy">
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/pranav-jadhav-mlops"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://huggingface.co/shreecloud"><img src="https://img.shields.io/badge/HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="HuggingFace"></a>
  <a href="mailto:pranav.shree96@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
</p>

<p align="center">
  <a href="https://pranavshree-ai.github.io/pranavshree-ai/">
    <img src="https://img.shields.io/badge/🚀_LAUNCH_LIVE_3D_EXPERIENCE-WebGL_·_Vanta_3D_Fog_·_GSAP_·_Lenis-00F5FF?style=for-the-badge&labelColor=0B1220&logo=three.js&logoColor=00F5FF" height="42" alt="Launch 3D WebGL Portfolio Experience">
  </a>
</p>
<p align="center">
  <sub>✨ <b>Click the badge above to launch the real-time 3D Vanta Fog WebGL experience, self-healing loop simulator & interactive terminal.</b></sub>
</p>

## 👋 About Me

I'm a production-focused **Machine Learning Engineer** specialising in **LLMOps, MLOps and Generative AI**. I work across the whole loop: training models in PyTorch and PyTorch Lightning, fine-tuning transformers with HuggingFace PEFT/LoRA, evaluating LLMs (AI-judge, drift detection, auto fine-tuning triggers), optimising inference (vLLM, ONNX INT8, 4-bit quantisation, sub-50ms p50) and deploying on AWS and GCP.

Right now I'm a **Data Analytics Intern (AI/ML) at Fourise Software Solutions, Pune**, where I lead the team behind **GRGPT**, a RAG assistant over 100K+ Maharashtra government documents. I'm also finishing my **MCA at DY Patil Technical Campus** (expected March 2027).

### 🎯 What Drives Me

I care about answers being **correct, not just fluent**, so I measure everything: judge agreement, latency percentiles, drift, VRAM. I like systems that notice their own degradation and fix it without a human in the loop.

**Open to full-time, internship and remote-first ML engineering roles globally.**

---

## 🚀 Featured Projects

<table>
<tr>
<td width="50%" valign="top">

### 🏛️ GRGPT
**Government Resolution & Tender RAG Assistant**

**Problem:** finding the right Maharashtra GR or tender meant slow, manual PDF search.

**Solution:** a ChatGPT-style assistant restricted to one domain (farmer schemes, scholarships, how to fill a tender), so answers stay grounded in real documents. I led the team and owned backend, RAG pipeline and model, frontend logic and verification.

**Impact**
- 100K+ PDFs indexed as **1,037,086 vectors** in a single Qdrant container
- Relevant context in **2–3 s** per query
- Tested for correctness, not just fluency

**Tech:** `Qdrant` `RAG` `Embeddings` `LLM` `Docker` `Backend APIs`

</td>
<td width="50%" valign="top">

### 📊 LLM-Eval
**Production LLM Evaluation & Observability Platform**

**Problem:** LLM quality drifts in production, and fixing it usually needs a human.

**Solution:** a dual AI-judge pipeline (Phi-3 + Claude API) with Pydantic structured scoring, Evidently AI drift detection, and a closed loop: drift alert → LoRA job → Hub push → serving hot-swap.

**Impact**
- **94%** inter-rater agreement, zero schema violations over 500+ calls
- **Sub-50ms p50**; INT8 gives **1.8×** lower latency
- **Zero human intervention** from degradation to redeploy

**Tech:** `vLLM` `FastAPI` `Evidently AI` `MLflow` `LoRA` `Docker Compose`

</td>
</tr>
<tr>
<td width="50%" valign="top">

### ⚙️ DistilBERT + Advanced MLOps
**Sentiment Classifier with a Production Platform**

**Problem:** taking a fine-tuned transformer to a safe, observable production rollout.

**Solution:** an 8-service Docker Compose platform with a Feast + Redis feature store, Nginx canary (90/10 + shadow traffic) and ONNX INT8 serving.

**Impact**
- **92.4%** accuracy on SST-2, F1 0.924
- **42ms** p50, **sub-1s** rollback
- ~**$3,000/month** compute saved at 1,000 req/s

**Tech:** `PyTorch Lightning` `Feast` `Redis` `Nginx` `ONNX` `React`

</td>
<td width="50%" valign="top">

### 🔎 RAG Document Q&A
**LangChain + Claude 3.5 Sonnet**

**Problem:** getting grounded, citable answers out of PDF and text collections.

**Solution:** Sentence-BERT embeddings, FAISS and hybrid BM25 + dense retrieval feeding Claude for grounded generation, behind a FastAPI layer with SSE streaming.

**Impact**
- **Sub-200ms** end to end (retrieve → rerank → generate)
- Chunk-level **source citations**
- Hot-swappable retriever and LLM backends

**Tech:** `LangChain` `FAISS` `BM25` `FastAPI` `Streamlit` `Docker`

</td>
</tr>
</table>

<p align="center"><sub>More: Multi-Agent Content Suite · CNN + ResNet-18 (93.7% on CIFAR-10) · Llama-3-8B LoRA with DeepSpeed ZeRO-2 (~40% lower peak VRAM)</sub></p>

---

## 🛠️ Tech Stack

<h4 align="center">Machine Learning & Deep Learning</h4>
<p align="center">
  <img src="https://skillicons.dev/icons?i=py,pytorch,sklearn,pandas,numpy&theme=dark" alt="Python, PyTorch, scikit-learn, pandas, NumPy"><br>
  <img src="https://img.shields.io/badge/HuggingFace-FFD21E?style=flat-square&logo=huggingface&logoColor=black" alt="HuggingFace">
  <img src="https://img.shields.io/badge/PEFT%2FLoRA-7C3AED?style=flat-square" alt="PEFT/LoRA">
  <img src="https://img.shields.io/badge/XGBoost-189AB4?style=flat-square" alt="XGBoost">
  <img src="https://img.shields.io/badge/LightGBM-2E8B57?style=flat-square" alt="LightGBM">
  <img src="https://img.shields.io/badge/DeepSpeed-0A66C2?style=flat-square" alt="DeepSpeed">
</p>

<h4 align="center">LLM, RAG & Generative AI</h4>
<p align="center">
  <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white" alt="LangChain">
  <img src="https://img.shields.io/badge/Claude_API-D97757?style=flat-square&logo=anthropic&logoColor=white" alt="Claude API">
  <img src="https://img.shields.io/badge/OpenAI_API-412991?style=flat-square&logo=openai&logoColor=white" alt="OpenAI API">
  <img src="https://img.shields.io/badge/Qdrant-DC244C?style=flat-square" alt="Qdrant">
  <img src="https://img.shields.io/badge/FAISS-0467DF?style=flat-square" alt="FAISS">
  <img src="https://img.shields.io/badge/vLLM-30A2FF?style=flat-square" alt="vLLM">
  <img src="https://img.shields.io/badge/Pydantic-E92063?style=flat-square&logo=pydantic&logoColor=white" alt="Pydantic">
</p>

<h4 align="center">MLOps, LLMOps & Serving</h4>
<p align="center">
  <img src="https://skillicons.dev/icons?i=docker,githubactions,fastapi,nginx,redis,git&theme=dark" alt="Docker, GitHub Actions, FastAPI, Nginx, Redis, Git"><br>
  <img src="https://img.shields.io/badge/MLflow-0194E2?style=flat-square&logo=mlflow&logoColor=white" alt="MLflow">
  <img src="https://img.shields.io/badge/DVC-945DD6?style=flat-square&logo=dvc&logoColor=white" alt="DVC">
  <img src="https://img.shields.io/badge/Weights_%26_Biases-FFBE00?style=flat-square&logo=weightsandbiases&logoColor=black" alt="Weights and Biases">
  <img src="https://img.shields.io/badge/Evidently_AI-ED0500?style=flat-square" alt="Evidently AI">
  <img src="https://img.shields.io/badge/ONNX-005CED?style=flat-square&logo=onnx&logoColor=white" alt="ONNX">
  <img src="https://img.shields.io/badge/Feast-FF6B35?style=flat-square" alt="Feast">
</p>

<h4 align="center">Cloud & Data</h4>
<p align="center">
  <img src="https://skillicons.dev/icons?i=aws,gcp,bash&theme=dark" alt="AWS, GCP, Bash"><br>
  <img src="https://img.shields.io/badge/SQL-336791?style=flat-square" alt="SQL">
  <img src="https://img.shields.io/badge/PySpark-E25A1C?style=flat-square&logo=apachespark&logoColor=white" alt="PySpark">
  <img src="https://img.shields.io/badge/Delta_Lake-00ADD4?style=flat-square" alt="Delta Lake">
  <img src="https://img.shields.io/badge/DuckDB-FFF000?style=flat-square&logo=duckdb&logoColor=black" alt="DuckDB">
  <img src="https://img.shields.io/badge/SageMaker-FF9900?style=flat-square" alt="SageMaker">
  <img src="https://img.shields.io/badge/Vertex_AI-4285F4?style=flat-square&logo=googlecloud&logoColor=white" alt="Vertex AI">
</p>

---

## 📊 GitHub Analytics

<p align="center">
  <img height="170" src="https://github-readme-stats.vercel.app/api?username=shreecloudai&show_icons=true&hide_border=true&bg_color=0B1220&title_color=22D3EE&text_color=93A7C6&icon_color=A78BFA&custom_title=GitHub%20Stats" alt="GitHub stats">
  <img height="170" src="https://github-readme-stats.vercel.app/api/top-langs/?username=shreecloudai&layout=compact&hide_border=true&bg_color=0B1220&title_color=22D3EE&text_color=93A7C6&custom_title=Most%20Used%20Languages" alt="Most used languages">
</p>

<p align="center">
  <img src="https://streak-stats.demolab.com?user=shreecloudai&theme=dark&hide_border=true&background=0B1220&ring=22D3EE&fire=A78BFA&currStreakLabel=22D3EE" alt="GitHub streak">
</p>

<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=shreecloudai&bg_color=0B1220&color=22D3EE&line=A78BFA&point=EAF1FF&area=true&hide_border=true" alt="Contribution activity graph">
</p>

<p align="center">
  <img src="profile-3d-contrib/profile-night-rainbow.svg" width="100%" alt="Isometric 3D graph of my GitHub contributions, regenerated daily">
</p>

---

## 🔭 Current Focus & Interests

```python
class Pranav:
    role = "Machine Learning Engineer · LLMOps · MLOps · GenAI"

    currently = {
        "work":    "Data Analytics Intern (AI/ML) @ Fourise, leading GRGPT, a RAG assistant over 100K+ govt documents",
        "study":   "MCA @ DY Patil Technical Campus (expected Mar 2027)",
    }

    going_deep_on = [
        "LLM evaluation: AI-judge scoring, drift detection, hallucination checks",
        "Closed-loop fine-tuning: drift alert -> LoRA -> redeploy",
        "Inference optimisation: vLLM, ONNX INT8, 4-bit quantisation",
        "RAG at scale: hybrid retrieval, 1M+ vector indexes",
    ]

    open_to = ["Full-time", "Internships", "Remote-first ML roles worldwide"]
```

---

## 🌍 Open Source & Community

<table align="center">
<tr>
<td align="center" width="25%"><b>🤗 HuggingFace Hub</b><br><sub>100+ downloads<br>datasets, models, model cards</sub></td>
<td align="center" width="25%"><b>🐙 GitHub</b><br><sub>8 documented ML repos<br>diagrams, Docker, CI/CD badges</sub></td>
<td align="center" width="25%"><b>✍️ Medium</b><br><sub>3+ walkthroughs, 500+ reads<br>LLM eval, RAG, MLOps</sub></td>
<td align="center" width="25%"><b>💼 LinkedIn</b><br><sub>Building in public<br>W&B dashboards, benchmarks</sub></td>
</tr>
</table>

---

## 📊 3D Contribution Graph

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="profile-3d-contrib/profile-night-rainbow.svg">
    <img src="profile-3d-contrib/profile-night-rainbow.svg" width="100%" alt="Pranav Jadhav 3D Contribution Graph">
  </picture>
</p>

---

## 🤝 Let's Connect

<p align="center"><b>Always open to discussing ML systems, LLM evaluation, or opportunities to be part of your team.</b></p>

<p align="center">
  <a href="mailto:pranav.shree96@gmail.com"><img src="https://img.shields.io/badge/Email-pranav.shree96@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
  <a href="https://www.linkedin.com/in/pranav-jadhav-mlops"><img src="https://img.shields.io/badge/LinkedIn-pranav--jadhav--mlops-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://huggingface.co/shreecloud"><img src="https://img.shields.io/badge/HuggingFace-shreecloud-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="HuggingFace"></a>
</p>

<img src="assets/footer.svg" width="100%" alt="Pranav Jadhav — building ML systems that measure themselves and fix themselves.">
