const form = document.getElementById('vote-form');

// FORM SUBMIT EVENT
form.addEventListener('submit', e=>{
    
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os: choice};

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();
});

fetch('http://localhost:3000/poll')
.then(res => res.json())
.then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;
    // COUNT VOTE POINTS OF EACH OS
    voteCounts = votes.reduce((acc, vote) => (
        (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc),
        {}
    );
    let dataPoints = [
        { label: 'Windows', y: voteCounts.Windows},
        { label: 'MacOS', y: voteCounts.MacOS},
        { label: 'Linux', y: voteCounts.Linux},
        { label: 'Other', y: voteCounts.Other}
    ];
    
    let chartContainer = document.querySelector('#chartContainer');
    
    if(chartContainer){
        const chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            backgroundColor: "#282c34",
            theme: 'theme1',
            title: {
                text: `Total Votes : ${votes.length}`,
                fontColor: '#abb2bf',
            },
            data: [
                {
                    type: 'column',
                    dataPoints: dataPoints,
                    fontColor: '#abb2bf'
                }
            ]
        });
        chart.render();
    
            // Enable pusher logging - don't include this in production
            //Pusher.logToConsole = true;
            Pusher.logToConsole = false;
    
            var pusher = new Pusher('4cf1f05e0acb7ebd4f72', {
              cluster: 'eu'
            });
        
            var channel = pusher.subscribe('os-poll');
            channel.bind('os-vote', function(data) {
              dataPoints = dataPoints.map(x => {
                if(x.label == data.os){
                    x.y+= data.points;
                    return x;
                }
                else{
                    return x;
                }
              });
              chart.render();
            });
    }
})