const CONFIG = {
    apiEndpoinds: {
        data: '/assets/data.json'
    }
}

const timeActivity = document.querySelectorAll('.time__activity');
const btnUserTimeframes = document.querySelectorAll('.time__user-timeframe');

const fetchData = async () => {
    try {
        const response = await fetch(CONFIG.apiEndpoinds.data);
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
        throw new Error('Error fetching data:', error);
    }
}

const placeActivityData = (data, timeframe) => {
    data.forEach((activity, index) => {
        timeActivity[index].classList.add(`time__activity--${activity.title.toLowerCase().replace(' ', '-')}`);
        const activityType = timeActivity[index].querySelector('.time__activity-type');
        const activityHours = timeActivity[index].querySelector('.time__activity-hours');
        const activityPrevious = timeActivity[index].querySelector('.time__activity-previous');
        const activityMenu = timeActivity[index].querySelector('.time__activity-menu');
        
        activityType.textContent = activity.title;
        activityHours.textContent = activity.timeframes[timeframe].current + 'hrs';
        switch (timeframe) {
            case 'daily':
                activityPrevious.textContent = `Yesterday - ${activity.timeframes[timeframe].previous}hrs`;
                break;
            case 'weekly':
                activityPrevious.textContent = `Last Week - ${activity.timeframes[timeframe].previous}hrs`;
                break;
            case 'monthly':
                activityPrevious.textContent = `Last Month - ${activity.timeframes[timeframe].previous}hrs`;
                break;
            default:
                activityPrevious.textContent = `Yesterday - ${activity.timeframes[timeframe].previous}hrs`;
                break;
        }
        activityMenu.classList.remove('time__activity-menu--hidden');
    });
};

const initialize = async () => {
    const data = await fetchData();

    if (!data) throw new Error('No data found');

    placeActivityData(data, 'daily');
    document.querySelector('button[data-timeframe="daily"]').classList.add('time__user-timeframe--active');

    btnUserTimeframes.forEach(btn => {
        btn.addEventListener('click', () => {
            btnUserTimeframes.forEach(btn => {
                btn.classList.remove('time__user-timeframe--active');
            });
            placeActivityData(data, btn.dataset.timeframe);
            btn.classList.add('time__user-timeframe--active');
        });
    });
}

initialize();