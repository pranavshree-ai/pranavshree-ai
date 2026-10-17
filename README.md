<p align="center">
  <img src="assets/hero.svg" width="100%" alt="Pranav Jadhav — Machine Learning Engineer. LLMOps, MLOps, Generative AI and Deep Learning.">
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3200&pause=900&color=22D3EE&center=true&vCenter=true&width=760&lines=LLMOps+%C2%B7+MLOps+%C2%B7+Generative+AI;RAG+over+1M%2B+vectors+in+production;Evaluate+%E2%86%92+Detect+Drift+%E2%86%92+Fine-tune+%E2%86%92+Redeploy" alt="Typing animation: LLMOps, MLOps, Generative AI; RAG over 1M+ vectors; evaluate, detect drift, fine-tune, redeploy">
</p>

<p align="center">
  <a href="https://pranavshree-ai.github.io/pranavshree-ai/">
    <img src="https://img.shields.io/badge/🚀_LAUNCH_LIVE_3D_WEB_EXPERIENCE-WebGL_·_Vanta_3D_Fog_·_GSAP_·_Lenis-00F5FF?style=for-the-badge&labelColor=0B1220&logo=three.js&logoColor=00F5FF" height="42" alt="Launch 3D WebGL Portfolio Experience">
  </a>
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/pranav-jadhav-mlops"><img src="https://img.shields.io/badge/LinkedIn-pranav--jadhav--mlops-0E7490?style=for-the-badge&labelColor=0B1220&logo=linkedin&logoColor=22D3EE" alt="LinkedIn"></a>
  <a href="https://huggingface.co/shreecloud"><img src="https://img.shields.io/badge/HuggingFace-shreecloud-0E7490?style=for-the-badge&labelColor=0B1220&logo=huggingface&logoColor=22D3EE" alt="HuggingFace"></a>
  <a href="mailto:pranav.shree96@gmail.com"><img src="https://img.shields.io/badge/Email-pranav.shree96@gmail.com-0E7490?style=for-the-badge&labelColor=0B1220&logo=gmail&logoColor=22D3EE" alt="Email"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Open_to_Full--time_&_Remote_Roles-10B981?style=flat-square&labelColor=0B1220" alt="Availability">
  <img src="https://img.shields.io/badge/Location-Pune,_India_(Worldwide_Remote)-38BDF8?style=flat-square&labelColor=0B1220" alt="Location">
  <img src="https://img.shields.io/badge/Focus-Autonomous_MLOps_&_RAG-818CF8?style=flat-square&labelColor=0B1220" alt="Focus">
</p>

---

## ⚡ Proof in Production Metrics

<table align="center" width="100%">
<tr>
<td align="center" width="25%">
<h3>1,037,086+</h3>
<b>Vectors in 1 Container</b><br>
<sub>Qdrant HNSW cosine index over 100K+ PDFs with 2–3s retrieval</sub>
</td>
<td align="center" width="25%">
<h3>94.0%</h3>
<b>AI Judge Agreement</b><br>
<sub>Phi-3 + Claude dual judges with 0 schema violations across 500+ calls</sub>
</td>
<td align="center" width="25%">
<h3>42 ms</h3>
<b>Inference P50 Latency</b><br>
<sub>1.8× faster with ONNX INT8; ~40% lower VRAM with DeepSpeed ZeRO-2</sub>
</td>
<td align="center" width="25%">
<h3>0 Steps</h3>
<b>Human Intervention</b><br>
<sub>Closed-loop: drift alert → auto LoRA train → hub push → hot-swap</sub>
</td>
</tr>
</table>

---

## 🔄 The Self-Healing Architecture Loop

> *“A model that notices it is getting worse and fixes itself without a human in the loop.”*

```
  ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
  │  01 // EVALUATE │       │02 // DETECT DRIFT│      │ 03 // FINE-TUNE │       │  04 // REDEPLOY │
  │  Dual AI Judges ├──────►│  Evidently AI   ├──────►│ LoRA Container ├──────►│  vLLM Serving   │
  │  Phi-3 + Claude │       │ Alert Threshold │       │  HF Hub Push    │       │ Sub-50ms Hot-Swap│
  └─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
```

1. **01 // EVALUATE (Dual AI Judges)**: Incoming queries and answers are scored concurrently by Phi-3 and Claude API using strict Pydantic schemas. 94% inter-rater agreement across 500+ production calls.
2. **02 // DETECT DRIFT (Evidently AI)**: Statistical monitors inspect embeddings and score distribution. If quality falls below the `0.85` threshold, an automated retraining payload is dispatched.
3. **03 // FINE-TUNE (LoRA Training Job)**: A containerized Hugging Face PEFT / LoRA job spins up on the flagged failure cases (`r=16, α=32`), verifies weights, and pushes the new adapter to the Hub.
4. **04 // REDEPLOY (vLLM Hot-Swap)**: Serving hot-swaps active adapter weights dynamically without service restarts or dropped requests, restoring health in sub-50ms.

---

## 🚀 Selected Production Systems

<table>
<tr>
<td width="50%" valign="top">

### 🏛️ GRGPT
**Government Resolution & Tender RAG Assistant**
*Role: Team Lead & Architect · Fourise Software Solutions*

- **Problem:** Finding the right Maharashtra government resolution or tender meant slow, manual PDF search across thousands of unindexed documents.
- **Solution:** A ChatGPT-style domain assistant restricted strictly to government documents (farmer schemes, scholarships, tender guidelines) to prevent hallucination.
- **Production Impact:**
  - **1,037,086 vectors** indexed from 100K+ PDFs in a single Qdrant container
  - **2 to 3 s** semantic retrieval latency
  - Domain-grounded verification layer ensures 100% factual fidelity
- **Tech:** `Qdrant` `Sentence-BERT` `RAG` `Hybrid BM25` `FastAPI` `Docker`

</td>
<td width="50%" valign="top">

### 📊 LLM-Eval
**Production LLM Evaluation & Observability Platform**
*Role: Creator & System Architect*

- **Problem:** Production LLM quality degrades quietly over time; manual evaluation does not scale.
- **Solution:** Autonomous observability platform combining dual AI judges (Phi-3 + Claude API), Evidently AI drift detection, and automated closed-loop fine-tuning.
- **Production Impact:**
  - **94%** judge agreement with zero schema violations over 500+ calls
  - **1.8×** lower latency with ONNX INT8 quantization
  - **Zero human steps** required from degradation to redeploy
- **Tech:** `vLLM` `FastAPI` `Evidently AI` `MLflow` `PEFT/LoRA` `Docker Compose`

</td>
</tr>
<tr>
<td width="50%" valign="top">

### ⚙️ DistilBERT + Advanced MLOps
**Sentiment Classifier with Production Serving Platform**
*Role: Machine Learning Engineer*

- **Problem:** Transitioning a fine-tuned transformer into a zero-downtime, canary-tested production rollout.
- **Solution:** 8-service Docker Compose platform with Feast + Redis feature store, Nginx canary routing (90/10 + shadow traffic), and ONNX INT8 serving.
- **Production Impact:**
  - **92.4%** accuracy on SST-2 (F1: 0.924)
  - **42ms** P50 latency with **sub-1s** instant rollback
  - **~$3,000/month** compute cost saved at 1,000 req/s
- **Tech:** `PyTorch Lightning` `Feast` `Redis` `Nginx Canary` `ONNX INT8`

</td>
<td width="50%" valign="top">

### 🔎 RAG Document Q&A
**LangChain + Claude 3.5 Sonnet Grounded Assistant**
*Role: ML & Backend Engineer*

- **Problem:** Generating grounded, fully citable answers across heterogeneous PDF and text collections.
- **Solution:** Sentence-BERT embeddings, FAISS and hybrid BM25 + dense retrieval feeding Claude for grounded generation, streamed over SSE through FastAPI.
- **Production Impact:**
  - **< 200 ms** retrieve, rerank, and generation trigger
  - Chunk-level source citations on all responses
- **Tech:** `LangChain` `Claude 3.5 Sonnet` `FAISS` `BM25` `FastAPI SSE`

</td>
</tr>
</table>

### Additional Engineering Systems:
- **ResNet-18 Deep Learning Classifier**: 93.7% accuracy on CIFAR-10 with custom learning rate schedules.
- **Llama-3-8B LoRA with DeepSpeed ZeRO-2**: Reduced peak VRAM by ~40% for cloud GPU fine-tuning.
- **Multi-Agent Content Suite**: Automated research, drafting, verification, and markdown publication.

---

## 💻 The Pranav Jadhav Object Definition

```python
class Pranav:
    role = "Machine Learning Engineer, LLMOps, MLOps, GenAI"
    location = "Pune, India (Open to Worldwide Remote & Relocation)"

    going_deep_on = [
        "LLM evaluation: AI-judge scoring, drift, hallucination checks",
        "Closed-loop fine-tuning: drift alert -> LoRA -> redeploy",
        "Inference optimisation: vLLM, ONNX INT8, 4-bit quantisation",
        "RAG at scale: hybrid retrieval, 1M+ vector indexes",
    ]

    open_to = ["Full-time", "Internships", "Remote-first ML roles"]

    def build_system(self):
        return {
            "philosophy": "Correct, not just fluent",
            "metrics": ["p50/p99 latency", "judge agreement", "VRAM footprint"],
            "uptime": 99.99,
            "status": "READY_FOR_DEPLOYMENT"
        }
```

---

## 🛠️ Production Toolkit & Tech Matrix

| Domain | Technologies & Frameworks |
| :--- | :--- |
| **Machine Learning** | `Python` `PyTorch` `PyTorch Lightning` `scikit-learn` `pandas` `NumPy` `Hugging Face` `PEFT & LoRA` `DeepSpeed ZeRO` `XGBoost` `LightGBM` |
| **LLMs & RAG** | `LangChain` `Claude 3.5 API` `OpenAI API` `Qdrant (1M+ vectors)` `FAISS` `BM25 Hybrid` `vLLM` `Pydantic Schemas` `Phi-3` `Llama-3` |
| **MLOps & Serving** | `Docker Compose` `GitHub Actions` `FastAPI` `Nginx Canary` `Redis` `MLflow` `Evidently AI` `ONNX INT8` `Feast Feature Store` `Weights & Biases` |
| **Cloud & Data** | `AWS (EC2, S3, SageMaker)` `GCP (Vertex AI)` `SQL` `PySpark` `Delta Lake` `DuckDB` `Bash Scripting` `Git & LFS` |

---

## 📊 3D Contribution Graph

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="profile-3d-contrib/profile-night-rainbow.svg">
    <img src="profile-3d-contrib/profile-night-rainbow.svg" width="100%" alt="Pranav Jadhav 3D Contribution Graph">
  </picture>
</p>

---

## 👋 About Me & Engineering Philosophy

I'm a production-focused **Machine Learning Engineer** based in Pune, India. I specialize in the full lifecycle: model training in PyTorch and Lightning, transformer fine-tuning with Hugging Face PEFT/LoRA, rigorous multi-judge evaluation, inference acceleration (vLLM, ONNX INT8, sub-50ms p50), and scalable container deployments on AWS and GCP.

Currently, I serve as a **Data Analytics Intern (AI/ML) at Fourise Software Solutions, Pune**, where I lead the team behind **GRGPT** (1,037,086 vectors over 100K+ documents). Concurrently completing my **Master of Computer Applications (MCA)** at DY Patil Technical Campus (expected March 2027).

> *"I care about answers being **correct, not just fluent**. So I measure everything: judge agreement, latency percentiles, embedding drift, and peak VRAM. I like systems that notice their own degradation and fix it without a human in the loop."*

---

## 🤝 Let's Connect

<p align="center">
  <b>Always open to discussing ML systems, LLM evaluation, or opportunities to join your team.</b>
</p>

<p align="center">
  <a href="mailto:pranav.shree96@gmail.com"><img src="https://img.shields.io/badge/Email-pranav.shree96@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
  <a href="https://www.linkedin.com/in/pranav-jadhav-mlops"><img src="https://img.shields.io/badge/LinkedIn-pranav--jadhav--mlops-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://huggingface.co/shreecloud"><img src="https://img.shields.io/badge/HuggingFace-shreecloud-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="HuggingFace"></a>
  <a href="https://github.com/pranavshree-ai"><img src="https://img.shields.io/badge/GitHub-pranavshree--ai-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
</p>

<p align="center">
  <a href="https://pranavshree-ai.github.io/pranavshree-ai/">
    <img src="https://img.shields.io/badge/✨_View_Interactive_3D_Experience-WebGL_·_Vanta_Fog_·_GSAP-22D3EE?style=for-the-badge&labelColor=0B1220" alt="Launch 3D WebGL Portfolio">
  </a>
</p>

<img src="assets/footer.svg" width="100%" alt="Pranav Jadhav — building ML systems that measure themselves and fix themselves.">
