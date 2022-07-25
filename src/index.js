const calcular = document.querySelector("#button");
const monto = document.querySelector("#monto");
const comisionOntop = 1.54;
const comisionCrypto = 0.8;

async function getDolarCCL() {
  try {
    const response = await fetch(
      "https://mercados.ambito.com//dolarrava/cl/variacion",
      { method: "GET" }
    );
    var data = await response.json();
    var dolarCCL = parseFloat(data.compra.replace(",", "."));
    let montoACambiar = parseFloat(monto.value);
    var totalOntop = (montoACambiar - comisionOntop) * dolarCCL * 0.925;
    if (!montoACambiar || Number.isNaN(montoACambiar) || montoACambiar < 20) {
      document.querySelector("#total-ontop").innerText = `
      El monto minimo para transferir desde Ontop es $20`;
      return null;
    }
    document.querySelector("#total-ontop").innerText = `
              Dolar CCL = $${dolarCCL}
              TOTAL = $${totalOntop.toFixed(2)}
              Estarias cambiando a = $${(
                totalOntop / montoACambiar
              ).toFixed(2)}
              `;
  } catch (error) {
    console.log(error);
  }
}

async function getDolarCrypto() {
  try {
    const response = await fetch(
      `https://criptoya.com/api/lemoncash/USDC`,
      { method: "GET" }
    );
    var data = await response.json();
    var montoACambiar = parseFloat(monto.value);
    var totalLemon = (
      parseFloat(data.totalBid) *
      (montoACambiar - comisionCrypto)
    );
    if (!montoACambiar || Number.isNaN(montoACambiar) || montoACambiar < 20) {
      document.querySelector("#total-lemon").innerText = `
      El monto minimo para transferir desde Ontop es $20`;
      return null;
    }
    document.querySelector("#total-lemon").innerText = `
              Dolar Crypto = $${data.totalBid.toFixed(2)}
              TOTAL = $${totalLemon.toFixed(2)}
              Estarias cambiando a = $${(
                totalLemon / montoACambiar
              ).toFixed(2)}
              `;
  } catch (error) {
    console.log(error);
  }
}

async function getDolarBlue() {
  try {
    const data = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    const dolares = await data.json()
    const filteredDolar = dolares.find((e) => e.casa.nombre === 'Dolar Blue')?.casa.compra
    const dolarBlue = parseFloat(filteredDolar.replace(",", ".")).toFixed(2);
    let montoACambiar = parseFloat(monto.value);
    console.log(Number.isNaN(montoACambiar))
    if (!montoACambiar || Number.isNaN(montoACambiar)  || montoACambiar < 1) {
      document.querySelector("#total-blue").innerText = `
      Monto invalido
      `;
      return null
    }
    document.querySelector("#total-blue").innerText = `
    Dolar Blue = $${dolarBlue}
    TOTAL = $${(dolarBlue * montoACambiar).toFixed(2)}
    Estarias cambiando a = $${dolarBlue}
    `;
  } catch (error) {
    console.log(error);
  }
}
calcular.addEventListener("click", function (e) {
  e.preventDefault();
  getDolarCCL();
  getDolarCrypto();
  getDolarBlue();
});