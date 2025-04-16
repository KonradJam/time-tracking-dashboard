
const timeActivity = document.querySelectorAll('.time__activity');

const fetchData = async () => {
    try {
        const response = await fetch('../../assets/data.json');
        if (!response.ok) {
            switch (response.status) {
                case 404:
                    throw new Error('Data file not found');
                case 403:
                    throw new Error('Access to data file forbidden');
                default:
                    throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// const placeActivityData = (data, timeframe) => {
//     timeActivity.forEach(activity => {
//         if (activity.querySelector('.time__activity-type').textContent === data.title) {
//             activity.querySelector('.time__activity-hours').textContent = data.timeframes[timeframe].current + 'hrs';
//             switch (timeframe) {
//                 case 'daily':
//                     activity.querySelector('.time__activity-previous').textContent = 'Yesterday - ' + data.timeframes[timeframe].previous + 'hrs';
//                     break;
//                 case 'weekly':
//                     activity.querySelector('.time__activity-previous').textContent = 'Last Week - ' + data.timeframes[timeframe].previous + 'hrs';
//                     break;
//                 case 'monthly':
//                     activity.querySelector('.time__activity-previous').textContent = 'Last Month - ' + data.timeframes[timeframe].previous + 'hrs';
//                     break;
//                 default:
//                     activity.querySelector('.time__activity-previous').textContent = 'Yesterday - ' + data.timeframes[timeframe].previous + 'hrs';
//                     break;
//             }
//         }
//     });
// };

// const initialize = async () => {
//     const data = await fetchData();
//     if (!data) return;
//     placeActivityData(data, 'daily');
// }

// initialize();