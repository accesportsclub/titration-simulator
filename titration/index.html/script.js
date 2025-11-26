let chart;

function simulate() {
    const acid = parseFloat(document.getElementById("acid").value);
    const acidVol = parseFloat(document.getElementById("acidVol").value);
    const base = parseFloat(document.getElementById("base").value);

    const totalMolesAcid = acid * (acidVol / 1000);
    const eqVolume = (totalMolesAcid / base) * 1000;

    document.getElementById("eqPoint").innerText =
        "Equivalence Point Volume: " + eqVolume.toFixed(2) + " mL";

    document.getElementById("pH").innerText =
        "pH at Equivalence: 7.00 (Strong Acid–Strong Base)";

    let volumes = [];
    let pHValues = [];

    for (let v = 0; v <= eqVolume + 20; v += 1) {
        volumes.push(v);

        const addedMoles = base * (v / 1000);

        let pH;

        if (addedMoles < totalMolesAcid) {
            const Hplus = (totalMolesAcid - addedMoles) / ((acidVol + v) / 1000);
            pH = -Math.log10(Hplus);
        } else if (addedMoles === totalMolesAcid) {
            pH = 7;
        } else {
            const OH = (addedMoles - totalMolesAcid) / ((acidVol + v) / 1000);
            pH = 14 + Math.log10(OH);
        }

        pHValues.push(pH);
    }

    if (chart) chart.destroy();

    const ctx = document.getElementById("chart").getContext("2d");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: volumes,
            datasets: [{
                label: "pH vs Volume of Base Added (mL)",
                data: pHValues,
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    title: { display: true, text: "Volume of Base Added (mL)" }
                },
                y: {
                    title: { display: true, text: "pH" },
                    min: 0,
                    max: 14
                }
            }
        }
    });
}
