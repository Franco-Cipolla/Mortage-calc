const amountInput = document.getElementById('amount');
const interestRateInput = document.getElementById('rate');
const termInput = document.getElementById('term');
const calculateButton = document.getElementById('calculate');
const beforeResult = document.getElementById('results-start');
const afterResult = document.getElementById('results-end');
const info = document.querySelectorAll('.info');
const errorP = document.querySelectorAll('.errP');
const monthlyDisplay = document.getElementById('monthly-result');
const totalDisplay = document.getElementById('total-result');
const clearBtn = document.getElementById('clear-all');



const getValues= ()=> {
    const amount = parseFloat(amountInput.value);
    const interestRate = parseFloat(interestRateInput.value);
    const term = parseInt(termInput.value,10);
    let mortgageType = null;
    if (document.getElementById('repayment').checked) {
        mortgageType = 'repayment';
    } else if (document.getElementById('interest-only').checked) {
        mortgageType = 'interest-only';
    }
    return { amount, interestRate, term, mortgageType };
}


calculateButton.addEventListener('click', (event) => {
    event.preventDefault();

    const { amount, interestRate, term, mortgageType } = getValues();


    if(!amount || !interestRate || !term || amount <= 0 || interestRate <= 0 || term <= 0 || mortgageType === null) {
        amountInput.classList.add('outline-red');
        amountInput.classList.remove('outline-slate-300');
        interestRateInput.classList.add('outline-red');
        interestRateInput.classList.remove('outline-slate-300');
        termInput.classList.add('outline-red');
        termInput.classList.remove('outline-slate-300');
        info.forEach((el) => {
            el.classList.remove('bg-slate-100');
            el.classList.add('bg-red');
            el.classList.remove('text-slate-900');
            el.classList.add('text-white');
        });
        errorP.forEach((el) => {
            el.classList.remove('hidden');
        });

        return;
    } else {
        amountInput.classList.remove('outline-red');
        interestRateInput.classList.remove('outline-red');
        termInput.classList.remove('outline-red');
        info.forEach((el) => {
            el.classList.add('bg-slate-100');
            el.classList.remove('bg-red');
            el.classList.add('text-slate-900');
            el.classList.remove('text-white');
        });
        errorP.forEach((el) => {
            el.classList.add('hidden');
        });
        calculateRepaymentsMonthly();
        beforeResult.classList.add('hidden');
        afterResult.classList.remove('hidden');
    }
    const monthlyPayment = Math.round(calculateRepaymentsMonthly() * 100) / 100;
    const totalPayment = Math.round(monthlyPayment * 12 * term * 100) / 100;
    monthlyDisplay.innerHTML = `$${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
totalDisplay.innerHTML = `$${totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

});




const calculateRepaymentsMonthly = () => {
    const { amount, interestRate, term, mortgageType } = getValues();

    const monthlyInterest = (interestRate / 100) / 12;
    const totalPayments = term * 12;

    let monthlyPayment;

    if (mortgageType === "repayment") {
        monthlyPayment = amount * (monthlyInterest * Math.pow(1 + monthlyInterest, totalPayments)) /
                         (Math.pow(1 + monthlyInterest, totalPayments) - 1);
    } else if (mortgageType === "interest-only") {
        monthlyPayment = amount * monthlyInterest;
    } else {
        throw new Error("Invalid mortgage type");
    }
    return monthlyPayment;
};

clearBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clear();

})

const clear = () => {
    amountInput.value = '';
    interestRateInput.value = '';
    termInput.value = '';
    beforeResult.classList.remove('hidden');
    afterResult.classList.add('hidden');
    amountInput.classList.remove('outline-red');
    interestRateInput.classList.remove('outline-red');
    termInput.classList.remove('outline-red');
    info.forEach((el) => {
        el.classList.add('bg-slate-100');
        el.classList.remove('bg-red');
        el.classList.add('text-slate-900');
        el.classList.remove('text-white');
    });
    errorP.forEach((el) => {
        el.classList.add('hidden');
    });
}
