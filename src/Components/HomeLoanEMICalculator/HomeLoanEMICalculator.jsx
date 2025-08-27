"use client";

import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

ChartJS.register(ArcElement, Tooltip, Legend);

import styles from "./HomeLoanEMICalculator.module.css";

export default function HomeLoanEMICalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.45);
  const [tenure, setTenure] = useState(20);
  const [calculatedEMI, setCalculatedEMI] = useState(null);

  const handleCalculate = () => {
    setCalculatedEMI(emi.toFixed(0));
  };

  // EMI Calculation
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenure * 12;
  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const data = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: ["#0F9D58", "#FF7043"],
        hoverBackgroundColor: ["#0B8043", "#E64A19"],
      },
    ],
  };

  return (
    <div className={styles.ArcElement}>
    <div className={`${styles.innerContainer} container`}>
      <div className={styles.calculatorWrapper}>
        <div className={styles.inputContainer}>

          <div className={styles.loanAmountGroup}>
            <label className={styles.inputLabel}>Loan Amount (₹)</label>
            <div className={styles.inputRow}>
              <input
                className={styles.numberInput}
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
              <input
                className={styles.rangeInput}
                type="range"
                min="100000"
                max="10000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
            </div>
            </div>

          <div className={styles.loanAmountGroup}>
            <label className={styles.inputLabel}>Loan Tenure (Years)</label>
            <div className={styles.inputRow}>
              <input
                type="number"
                className={styles.numberInput}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
              />
              <input
                type="range"
                className={styles.rangeInput}
                min="1"
                max="30"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
              />
            </div>
            </div>

          <div className={styles.loanAmountGroup}>
            <label className={styles.inputLabel}>Interest Rate (%)</label>
            <div className={styles.inputRow}>
              <input
                type="number"
                className={styles.numberInput}
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
              <input
                type="range"
                className={styles.rangeInput}
                min="5"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
          </div>
          <div className={styles.loanbtn}>
          <button className={styles.calcBtn} onClick={handleCalculate}>
            Calculate Your EMI
          </button>
          </div>
        </div>

        <div className={styles.resultContainer}>
          <h3>
            {calculatedEMI
              ? `You are Eligible for EMI Amount ₹${calculatedEMI}`
              : "Click Calculate to know your EMI"}
          </h3>
          <div className={styles.emiAmount}>
            <div className={styles.chartBox}>
              {/* <Doughnut data={data} /> */}
              <Doughnut
                data={data}
                options={{
                  plugins: {
                    legend: {
                      display: false, // hide default legend
                    },
                  },
                }}
              />
            </div>
            <div className={styles.emiBreakup}>
              <div className={styles.legendItem}>
                <span className={styles.principalBox}></span>
                <div className={styles.legendText}>
                  <p>Principal Amount: ₹ </p>
                  <p><strong>{loanAmount.toLocaleString()}</strong></p>
                </div>
              </div>

              <div className={styles.legendItem}>
                <span className={styles.interestBox}></span>
                <div className={styles.legendText}>
                  <p>Interest Amount: ₹ </p>
                  <p><strong>{totalInterest.toLocaleString()}</strong></p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.whyUs}>
            <h4>Why choose us for Home Loan?</h4>
            <div className={styles.whyUsPoints}>
              <div className={styles.pointItem}>
                <IoIosCheckmarkCircleOutline className={styles.checkmark} />
                <span>Offers from 34+ Banks</span>
              </div>
              <div className={styles.pointItem}>
                <IoIosCheckmarkCircleOutline className={styles.checkmark} />
                <span>Lowest Interest Rate</span>
              </div>
              <div className={styles.pointItem}>
                <IoIosCheckmarkCircleOutline className={styles.checkmark} />
                <span>Highest Loan Value</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
