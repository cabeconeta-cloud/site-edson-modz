const input = document.getElementById('fileInput');
const upBtn = document.getElementById('upBtn');
const nameTxt = document.getElementById('name');
const resDiv = document.getElementById('res');
const linkInp = document.getElementById('link');

input.onchange = () => { if(input.files[0]) nameTxt.innerText = input.files[0].name; };

upBtn.onclick = async () => {
    if(!input.files[0]) return alert("Selecione um arquivo!");
    const formData = new FormData();
    formData.append('file', input.files[0]);
    upBtn.innerText = "ENVIANDO...";
    
    const r = await fetch('/upload', { method: 'POST', body: formData });
    const d = await r.json();
    
    linkInp.value = d.link;
    resDiv.classList.remove('hidden');
    upBtn.innerText = "GERAR LINK";
};

function copy() {
    linkInp.select();
    document.execCommand('copy');
    alert("Copiado!");
}
