// ── ASYNC / FETCH UTILITIES ──

const minhaPromessa = new Promise((resolve, reject) => {
    const deuCerto = true;

    if (deuCerto) {
        resolve("Operação bem-sucedida");
    } else {
        reject("Ops, algo deu errado.");
    }
});

minhaPromessa
    .then((resultado) => {
        console.log("Ok ", resultado);
    })
    .catch((erro) => {
        console.error("Erro: ", erro);
    });

async function buscarAPI(url) {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error(`Erro http: ${resposta.status} ${resposta.statusText}`);
        }
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.log("Erro ao obter dados:", erro);
        return null;
    }
}