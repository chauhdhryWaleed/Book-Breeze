import React, { useEffect, useRef } from 'react';

const MonthlySalesCard = ({ salesData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Determine chart dimensions
    const chartWidth = canvas.width - 40;
    const chartHeight = canvas.height - 40;
    const barWidth = chartWidth / Object.keys(salesData).length;
    const maxValue = Math.max(...Object.values(salesData));

    // Draw bars
    let index = 0;
    for (const month in salesData) {
      const booksSold = salesData[month];
      const barHeight = (booksSold / maxValue) * chartHeight;
      const x = 40 + index * barWidth;
      const y = canvas.height - barHeight - 20;
      
      // Draw bar
      ctx.fillStyle = 'green';
      ctx.fillRect(x, y, barWidth - 10, barHeight);

      // Draw month label
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(month, x + (barWidth / 2), canvas.height - 5);

      // Draw books sold value label
      ctx.fillText(booksSold, x + (barWidth / 2), y - 5);

      index++;
    }

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(30, canvas.height - 20);
    ctx.lineTo(canvas.width - 10, canvas.height - 20);
    ctx.stroke();
  }, [salesData]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6">
      <div className="flex flex-row justify-between pb-6">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">Monthly Sales</h3>
          <span className="text-gray-500 text-sm">Monthly Traffic and Sales</span>
        </div>
      </div>
      <div className="relative">
        <canvas
          className="max-w-100"
          ref={canvasRef}
          width={600}
          height={400}
          style={{ display: 'block', boxSizing: 'border-box' }}
        ></canvas>
      </div>
    </div>
  );
};

export default MonthlySalesCard;
