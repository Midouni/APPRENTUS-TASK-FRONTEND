import React, { useEffect, useState } from 'react';
import style from './BarChart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { handleLoading, handleData } from '../../../store/monthsStatesSlice';

// Chart.js imports
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { approvedData, underReviewData, rejectedData } = useSelector(
    (state) => state.monthsStates
  );
  const { expensesData} = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleLoading());
    dispatch(handleData({ data: expensesData, year }));
  }, [year, expensesData, dispatch]);

  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Approved',
        data: approvedData,
        borderColor: 'black',
        backgroundColor: '#0C53B7',
      },
      {
        label: 'Under Review',
        data: underReviewData,
        borderColor: 'black',
        backgroundColor: '#B78104',
      },
      {
        label: 'Rejected',
        data: rejectedData,
        borderColor: 'black',
        backgroundColor: '#B72134',
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 0.5,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stats Per Month',
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={style.container}>
      <div className={style.select_year}>
        <p>Choose The Year: </p>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {[...Array(21).keys()].map((value) => (
            <option key={value} value={new Date().getFullYear() + 10 - value}>
              {new Date().getFullYear() + 10 - value}
            </option>
          ))}
        </select>
      </div>
      <Bar className={style.barchart} data={data} options={options} />
    </div>
  );
}

export default React.memo(BarChart);
