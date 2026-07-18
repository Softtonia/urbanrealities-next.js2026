'use client';
import React from 'react';
import { 
  FaEye, FaUsers, FaComments, FaBuilding, FaArrowUp, FaArrowDown, 
   FaDownload, FaDesktop, 
  FaMapMarkerAlt, FaStar, FaPlus 
} from 'react-icons/fa';
import Image from 'next/image';
import { DatePicker } from 'antd';
import styles from './AnalyticsDashboard.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

let cachedColors = null;
const getColors = () => {
  if (cachedColors) return cachedColors;
  if (typeof window !== 'undefined') {
    const style = getComputedStyle(document.documentElement);
    cachedColors = {
      orange: style.getPropertyValue('--Orange-500').trim() || '#f97316',
      blue: style.getPropertyValue('--Blue-500').trim() || '#3b82f6',
      green: style.getPropertyValue('--Green-500').trim() || '#22c55e',
      purple: style.getPropertyValue('--Purple-500').trim() || '#a855f7',
      red: style.getPropertyValue('--Red-500').trim() || '#ef4444',
      gray: style.getPropertyValue('--Gray-300').trim() || '#d1d5db',
      white: style.getPropertyValue('--White').trim() || '#ffffff',
      textLight: style.getPropertyValue('--Gray-400').trim() || '#9ca3af',
      gridLine: style.getPropertyValue('--Gray-100').trim() || '#f3f4f6',
    };
    return cachedColors;
  }
  return {
    orange: '#f97316',
    blue: '#3b82f6',
    green: '#22c55e',
    purple: '#a855f7',
    red: '#ef4444',
    gray: '#d1d5db',
    white: '#ffffff',
    textLight: '#9ca3af',
    gridLine: '#f3f4f6',
  };
};

const AnalyticsDashboard = () => {
  const COLORS = getColors();

  // --- Chart Data & Options ---

  // Sparklines
  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
    elements: { point: { radius: 0 }, line: { tension: 0.4, borderWidth: 2 } }
  };

  const createSparklineData = (color, data) => ({
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      data: data,
      borderColor: color,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 40);
        gradient.addColorStop(0, `${color}40`);
        gradient.addColorStop(1, `${color}00`);
        return gradient;
      },
      fill: true,
    }]
  });

  // Main Line Chart
  const mainChartData = {
    labels: ['10 May', '11 May', '12 May', '13 May', '14 May', '15 May', '16 May'],
    datasets: [
      {
        label: 'This Week',
        data: [100, 400, 250, 500, 400, 850, 600],
        borderColor: COLORS.orange,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, `${COLORS.orange}33`);
          gradient.addColorStop(1, `${COLORS.orange}00`);
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: COLORS.white,
        pointBorderColor: COLORS.orange,
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Last Week',
        data: [150, 500, 200, 300, 250, 550, 300],
        borderColor: COLORS.gray,
        borderDash: [5, 5],
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        fill: false
      }
    ]
  };

  const mainChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
    scales: {
      y: { border: { display: false }, grid: { color: COLORS.gridLine }, ticks: { color: COLORS.textLight, font: { size: 11 } } },
      x: { border: { display: false }, grid: { display: false }, ticks: { color: COLORS.textLight, font: { size: 11 } } }
    }
  };

  // Donut Chart
  const trafficData = {
    labels: ['Direct', 'Search Engines', 'Social Media', 'Referrals', 'Others'],
    datasets: [{
      data: [40.2, 32.1, 16.8, 7.6, 3.3],
      backgroundColor: [COLORS.blue, COLORS.green, COLORS.orange, COLORS.purple, COLORS.gray],
      borderWidth: 0,
      cutout: '75%',
    }]
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  // Bar Chart
  const leadsData = {
    labels: ['10 May', '11 May', '12 May', '13 May', '14 May', '15 May', '16 May'],
    datasets: [{
      data: [25, 20, 30, 18, 27, 21, 22],
      backgroundColor: COLORS.orange,
      borderRadius: 4,
      barThickness: 16
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { border: { display: false }, grid: { color: COLORS.gridLine }, ticks: { color: COLORS.textLight, font: { size: 11 } } },
      x: { border: { display: false }, grid: { display: false }, ticks: { color: COLORS.textLight, font: { size: 11 } } }
    }
  };

  // Device Donut
  const deviceData = {
    labels: ['Mobile', 'Desktop', 'Tablet'],
    datasets: [{
      data: [62.5, 31.3, 6.2],
      backgroundColor: [COLORS.blue, COLORS.green, COLORS.orange],
      borderWidth: 0,
      cutout: '70%',
    }]
  };

  const topStatsData = [
    {
      id: 1,
      title: 'Total Views',
      value: '1000',
      changeValue: 18.7,
      vsText: 'vs 03 May - 09 May',
      icon: <FaEye />,
      iconBg: 'var(--Orange-50, #fff7ed)',
      iconColor: COLORS.orange,
      sparklineData: [10, 25, 20, 45, 30, 50, 40],
    },
    {
      id: 2,
      title: 'Total Leads',
      value: '125',
      changeValue: -14.3,
      vsText: 'vs 03 May - 09 May',
      icon: <FaUsers />,
      iconBg: 'var(--Blue-50, #eff6ff)',
      iconColor: COLORS.blue,
      sparklineData: [50, 45, 40, 35, 25, 30, 15],
    },
    {
      id: 3,
      title: 'Total Inquiries',
      value: '78',
      changeValue: 11.2,
      vsText: 'vs 03 May - 09 May',
      icon: <FaComments />,
      iconBg: 'var(--Green-50, #f0fdf4)',
      iconColor: COLORS.green,
      sparklineData: [5, 15, 10, 25, 15, 30, 20],
    },
    {
      id: 4,
      title: 'Total Listings',
      value: '12',
      changeValue: 0,
      vsText: 'vs 03 May - 09 May',
      icon: <FaBuilding />,
      iconBg: 'var(--Purple-50, #faf5ff)',
      iconColor: COLORS.purple,
      sparklineData: [12, 12, 12, 12, 12, 12, 12],
    },
  ];

  return (
    <div className={styles.analyticsContainer}>
      
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1>Analytics</h1>
          <p>Track your performance and grow your real estate business.</p>
        </div>
        <div className={styles.headerRight}>
          <DatePicker.RangePicker 
            className={styles.datePickerBtn} 
            format="DD MMM YYYY"
            style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
          />
          <button className={styles.exportBtn}>
            <FaDownload /> Export Report
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className={styles.topStatsGrid}>
        {topStatsData.map((stat) => {
          const isPositive = stat.changeValue >= 0;
          const ChangeIcon = isPositive ? FaArrowUp : FaArrowDown;
          const graphColor = isPositive ? stat.iconColor : COLORS.red;

          return (
            <div className={styles.card} key={stat.id}>
              <div className={styles.statCardTop}>
                <div className={styles.iconWrapper} style={{ background: stat.iconBg, color: stat.iconColor }}>
                  {stat.icon}
                </div>
                <div className={styles.statInfo}>
                  <p className={styles.statLabel}>{stat.title}</p>
                  <div className={styles.statValueRow}>
                    <h2 className={styles.statValue}>{stat.value}</h2>
                    <span className={`${styles.statChange} ${isPositive ? styles.changePositive : styles.changeNegative}`}>
                      <ChangeIcon /> {Math.abs(stat.changeValue)}%
                    </span>
                  </div>
                  <p className={styles.statVs}>{stat.vsText}</p>
                </div>
              </div>
              <div className={styles.sparklineChart}>
                <Line data={createSparklineData(graphColor, stat.sparklineData)} options={sparklineOptions} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Grid */}
      <div className={styles.middleGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Views Overview</h3>
            <select className={styles.filterSelect}>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: '#f97316' }}></div> This Week</div>
            <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: '#d1d5db' }}></div> Last Week</div>
          </div>
          <div className={styles.mainChartWrapper}>
            <Line data={mainChartData} options={mainChartOptions} />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Traffic Sources</h3>
          </div>
          <div className={styles.donutWrapper}>
            <Doughnut data={trafficData} options={donutOptions} />
            <div className={styles.donutInner}>
              <h3>2,856</h3>
              <p>Total Views</p>
            </div>
          </div>
          <div className={styles.trafficList}>
            {[
              { name: 'Direct', color: '#3b82f6', percent: '40.2%', num: '1,148' },
              { name: 'Search Engines', color: '#22c55e', percent: '32.1%', num: '916' },
              { name: 'Social Media', color: '#f97316', percent: '16.8%', num: '480' },
              { name: 'Referrals', color: '#a855f7', percent: '7.6%', num: '217' },
              { name: 'Others', color: '#d1d5db', percent: '3.3%', num: '95' },
            ].map(item => (
              <div className={styles.trafficRow} key={item.name}>
                <div className={styles.trafficName}>
                  <div className={styles.legendDot} style={{ background: item.color }}></div> {item.name}
                </div>
                <div className={styles.trafficPercent}>{item.percent}</div>
                <div className={styles.trafficNumber}>{item.num}</div>
              </div>
            ))}
          </div>
          <a href="#" className={styles.viewFullLink}>View full report →</a>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className={styles.bottomGrid}>
        
        {/* Top Listings */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Top Performing Listings</h3>
            <button className={styles.filterSelect} style={{ border: 'none', fontWeight: 500 }}>View All</button>
          </div>
          <div className={styles.listingsWrapper}>
            {[
              { title: '3 BHK Builder Floor in DLF Phase 2', loc: 'DLF Phase 2, Gurgaon', views: 845, leads: 32 },
              { title: '2 BHK Apartment in Sector 65', loc: 'Sector 65, Gurgaon', views: 654, leads: 21 },
              { title: '4 BHK Villa in Palm Springs', loc: 'Golf Course Ext. Road, Gurgaon', views: 512, leads: 18 },
              { title: '1 RK Studio Apartment in Sector 45', loc: 'Sector 45, Gurgaon', views: 421, leads: 12 },
            ].map((prop, i) => (
              <div className={styles.listingItem} key={i}>
                <Image src={`/insight-card.png`} alt="property" width={50} height={50} className={styles.listingImg} />
                <div className={styles.listingInfo}>
                  <h4>{prop.title}</h4>
                  <p>{prop.loc}</p>
                </div>
                <div className={styles.listingStats}>
                  <span className={styles.viewsBadge}><FaEye /> {prop.views}</span>
                  <span className={styles.leadsBadge}>{prop.leads} Leads</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leads Trend */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Leads Trend</h3>
            <select className={styles.filterSelect}>
              <option>This Week</option>
            </select>
          </div>
          <div className={styles.barChartWrapper}>
            <Bar data={leadsData} options={barOptions} />
          </div>
          <div className={styles.leadsStatsRow}>
            <div className={styles.leadStatBox}>
              <p><FaUsers style={{ color: '#f97316' }} /> Total Leads</p>
              <h4>125</h4>
            </div>
            <div className={styles.leadStatBox}>
              <p><FaComments style={{ color: '#22c55e' }} /> Qualified Leads</p>
              <h4>68 <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 'normal' }}>54.4%</span></h4>
            </div>
            <div className={styles.leadStatBox}>
              <p><FaUsers style={{ color: '#6b7280' }} /> Conversion Rate</p>
              <h4>8.7% <span className={styles.changePositive} style={{ fontSize: '10px', fontWeight: 'normal' }}><FaArrowUp /> 2.3%</span></h4>
            </div>
          </div>
        </div>

        {/* Devices & Location */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Device Breakdown</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: '80px', height: '80px', position: 'relative' }}>
              <Doughnut data={deviceData} options={{...donutOptions, cutout: '65%'}} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#3b82f6', fontSize: '16px' }}>
                <FaDesktop />
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className={styles.trafficRow}>
                <span className={styles.trafficName}><div className={styles.legendDot} style={{ background: '#3b82f6' }}></div> Mobile</span>
                <span className={styles.trafficNumber}>62.5%</span>
              </div>
              <div className={styles.trafficRow}>
                <span className={styles.trafficName}><div className={styles.legendDot} style={{ background: '#22c55e' }}></div> Desktop</span>
                <span className={styles.trafficNumber}>31.3%</span>
              </div>
              <div className={styles.trafficRow}>
                <span className={styles.trafficName}><div className={styles.legendDot} style={{ background: '#f97316' }}></div> Tablet</span>
                <span className={styles.trafficNumber}>6.2%</span>
              </div>
            </div>
          </div>
          
          <h3 className={styles.cardTitle} style={{ marginTop: '24px', marginBottom: '16px' }}>Audience Location</h3>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ flex: 1, position: 'relative', height: '140px' }}>
              <Image src="/world_map_grey.png" alt="World Map" fill style={{ objectFit: 'contain', objectPosition: 'left center', opacity: 0.8 }} />
            </div>
            <div style={{ width: '140px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { city: 'Delhi', val: '28.6%' },
                { city: 'Gurgaon', val: '24.3%' },
                { city: 'Noida', val: '15.7%' },
                { city: 'Mumbai', val: '8.4%' },
                { city: 'Others', val: '23.0%' }
              ].map(c => (
                <div className={styles.trafficRow} key={c.city} style={{ fontSize: '11px' }}>
                  <span className={styles.trafficName}><FaMapMarkerAlt style={{ color: '#f97316', fontSize: '10px' }}/> {c.city}</span>
                  <span className={styles.trafficNumber}>{c.val}</span>
                </div>
              ))}
            </div>
          </div>
          <a href="#" className={styles.viewFullLink}>View full report →</a>
        </div>
      </div>

      {/* Footer Banner */}
      <div className={styles.footerBanner}>
        <div className={styles.bannerLeft}>
          <div className={styles.bannerIcon}>
            <FaStar />
          </div>
          <div className={styles.bannerText}>
            <h3>Improve your performance</h3>
            <p>Add more high quality listings to attract more views and leads.</p>
          </div>
        </div>
        <button className={styles.bannerBtn}>
          <FaPlus /> Add New Listing
        </button>
      </div>

    </div>
  );
};

export default AnalyticsDashboard;
