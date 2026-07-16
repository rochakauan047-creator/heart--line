import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "SUA_KEY",
  authDomain: "line-heart-bnc.firebaseapp.com",
  projectId: "line-heart-bnc"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

function pegarRank(pontos){

    if(pontos>=2500) return "✨ INDELÉVEL ✨";
    if(pontos>=2000) return "Princess-Golden";
    if(pontos>=1000) return "Golden-Girl";
    if(pontos>=600) return "Crimson-Eyes";
    if(pontos>=300) return "Pool-love";
    if(pontos>=150) return "Sunshine";

    return "Social";
}

onAuthStateChanged(auth, async(user)=>{

    if(!user) return;

    const snap = await getDoc(doc(db,"users",user.uid));

    if(!snap.exists()) return;

    const dados = snap.data();

    const pontos = dados.pontosTotal || 0;

    document.getElementById("pontos").innerText = pontos;

    document.getElementById("rank").innerText = pegarRank(pontos);

});