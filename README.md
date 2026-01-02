# OpenAI ChatKit Starter (Next.js)

Chatbot widget per The Bullet Gym usando OpenAI Agent Builder + ChatKit.

## Deploy su Vercel

### 1. Fork questo repo su GitHub

### 2. Vai su Vercel
- Crea account su [vercel.com](https://vercel.com)
- Clicca "Add New Project"
- Importa il repo che hai forkato

### 3. Aggiungi Environment Variables
Prima di cliccare Deploy, aggiungi:

| Name | Value |
|------|-------|
| `OPENAI_API_KEY` | La tua API key OpenAI (sk-proj-...) |
| `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID` | Il workflow ID del tuo agent (wf_...) |

### 4. Deploy
Clicca Deploy e aspetta 1-2 minuti.

### 5. Domain Allow List (IMPORTANTE!)
Dopo il deploy:
1. Copia l'URL Vercel (es: `tuoprogetto.vercel.app`)
2. Vai su [platform.openai.com](https://platform.openai.com)
3. Settings → Security → Domain allow list
4. Aggiungi il dominio Vercel
5. Genera la key

### 6. Testa
Apri l'URL Vercel. Dovresti vedere il chatbot!

## Embed su WordPress

Copia questo codice nel footer.php del tuo tema WordPress (prima di `</body>`):

```html
<script>
(function() {
  var iframe = document.createElement('iframe');
  iframe.src = 'https://TUO-URL-VERCEL.vercel.app';
  iframe.style.cssText = 'position:fixed;bottom:20px;right:20px;width:400px;height:600px;border:none;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.2);z-index:9999;';
  document.body.appendChild(iframe);
})();
</script>
```

Sostituisci `TUO-URL-VERCEL` con il tuo URL Vercel.

## Variabili d'ambiente

| Variabile | Descrizione |
|-----------|-------------|
| `OPENAI_API_KEY` | API key OpenAI (deve essere del "default project") |
| `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID` | ID del workflow da Agent Builder |

## Note

- L'API key deve essere creata nel "default project" di OpenAI
- Il workflow deve essere pubblicato su Agent Builder
- Il dominio Vercel deve essere nella allow list di OpenAI
