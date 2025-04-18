const CONFIG = {
    apiEndpoinds: {
        data: '/assets/data.json'
    }
}

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
    const timeBody = document.querySelector('.time__body');
    let contentOfTimeBody = '';
    const lastTimeframe = timeframe === 'daily' ? 'Yesterday' : timeframe === 'weekly' ? 'Last Week' : 'Last Month';
    
    data.forEach((activity) => {
        contentOfTimeBody += `
            <section class="time__activity time__activity--${activity.title.toLowerCase().replace(/\s+/g, '-')}">
                <div class="time__activity-info">
                    <div class="time__activity-row-1">
                        <h2 class="time__activity-type">${activity.title}</h2>
                    <button class="time__activity-menu" aria-label="Open activity menu">
                        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="currentColor" fill-rule="evenodd"/>
                        </svg>
                    </button>
                    </div>
                    <div class="time__activity-row-2">
                    <p class="time__activity-hours">${activity.timeframes[timeframe].current}hrs</p>
                    <p class="time__activity-previous">
                        ${lastTimeframe} - ${activity.timeframes[timeframe].previous}hrs
                    </p>
                    </div>
                </div>
            </section>
        `
    });
    timeBody.innerHTML = contentOfTimeBody;
};

const initialize = async () => {
    const btnUserTimeframes = document.querySelectorAll('.time__user-timeframe');
    const btnUserTimeframeDaily = document.querySelector('button[data-timeframe="daily"]');
    const data = await fetchData();

    if (!data) throw new Error('No data found');

    placeActivityData(data, 'daily');
    btnUserTimeframeDaily.classList.add('time__user-timeframe--active');

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