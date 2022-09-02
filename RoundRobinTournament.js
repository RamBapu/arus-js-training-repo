//World Cup Tournament 
const tournament = {
    name: 'World Cup',
    teams:[
        'India','Australia','England','Pakistan','Bangladesh',
        'New Zealand','South Africa','Srilanka','West Indies'
    ],
    startDate: new Date()
}

let numberOfTeams = tournament.teams.length
const slotOne = {slot_1:'3:30PM IST'}
const slotTwo = {slot_2:'7:30PM IST'}
const slots = [slotOne,slotTwo]
let totalMatchesList = []
generateMatchesInRoundRobin(tournament.teams)

//Function to create the match list in round robin 
function generateMatchesInRoundRobin(teams){
    const dummyTeam = -1
    if(numberOfTeams%2 === 1){
        teams.push(dummyTeam)
        numberOfTeams+=1
    }

    let numberOfMatches = 1
    for(let i=0;i<numberOfTeams-1;i++) {
        for(let j=0;j<numberOfTeams/2;j++){
            let k=numberOfTeams-1-j
            if(teams[j]!==dummyTeam && teams[k]!==dummyTeam){
                let matchId = 'WC'+numberOfMatches.toString().padStart(2,'0')
                const match = {
                    matchNumber:numberOfMatches++,
                    matchId:matchId,
                    firstTeam:teams[j],
                    secondTeam:teams[k],
                }
                totalMatchesList.push(match)
            }
        }
        teams.splice(1,0,teams.pop())
    }
    findNextSatAndSunday()
}


//Function to find the next Saturday and Sunday from start date
function findNextSatAndSunday(){
    let startDate = tournament.startDate
    let saturdayDate = new Date()
    let sundayDate = new Date()
    for(let i=0;i<=6;i++){
        if(startDate.getDay() +i == 6){
            saturdayDate.setDate(startDate.getDate()+i)
            sundayDate.setDate(startDate.getDate()+i+1)
        }
    }
    generateMatchDateAndSlot(saturdayDate,sundayDate)
}

//Function to assign the date and slot for each match
function generateMatchDateAndSlot(saturdayDate,sundayDate){
    let matchList = []
    totalMatchesList.forEach(matchElement => {
        matchList.push(matchElement.match)
    })
    
    let matchDate = []
    let originalNumberOfTeams = 0
    tournament.teams.forEach(team =>{
        if(team === -1)
            originalNumberOfTeams = numberOfTeams-1
        else
            originalNumberOfTeams = numberOfTeams
    })
    
    //Assigning Sat and Sun with Slot 1 and Slot 2 for teams greater than or equal to 8
    if(originalNumberOfTeams>=8){
        for(let i=1;i<=Math.ceil(matchList.length/4);i++){
            for(let j=1;j<=slots.length;j++){
                matchDate.push(new Date(saturdayDate))
            }
            for(let j=1;j<=slots.length;j++){
                matchDate.push(new Date(sundayDate))
            }
            saturdayDate.setDate(saturdayDate.getDate()+7)
            sundayDate.setDate(sundayDate.getDate()+7)
        } 

        totalMatchesList.forEach((match) =>{
            for(let i=1;i<=matchList.length;i++){
                if(match.matchNumber === i){
                    match.scheduledDate = matchDate[i-1]
                    if(i%2!=0)
                        match.scheduledTime = slotOne
                    else
                        match.scheduledTime = slotTwo
                }
            }
        })
    }
    //Assigning Sat and Sun with Slot 2 for teams greater than or equal to 4
    else if(originalNumberOfTeams<8 && originalNumberOfTeams>=4){
        for(let i=1;i<=Math.ceil(matchList.length/2);i++){
            matchDate.push(new Date(saturdayDate))
            matchDate.push(new Date(sundayDate))
            saturdayDate.setDate(saturdayDate.getDate()+7)
            sundayDate.setDate(sundayDate.getDate()+7)
        } 

        totalMatchesList.forEach((match) =>{
            for(let i=1;i<=matchList.length;i++){
                if(match.matchNumber === i){
                    match.scheduledDate = matchDate[i-1]
                    match.scheduledTime = slotTwo
                }
            }
        })
    }
    //Assigning Sun with Slot 2 for teams less than 4
    else if(originalNumberOfTeams<4){
        for(let i=1;i<=Math.ceil(matchList.length);i++){
            matchDate.push(new Date(sundayDate))
            sundayDate.setDate(sundayDate.getDate()+7)
        }
        totalMatchesList.forEach((match) =>{
            for(let i=1;i<=matchList.length;i++){
                if(match.matchNumber === i){
                    match.scheduledDate = matchDate[i-1]
                    match.scheduledTime = slotTwo
                }
            }
        })
    }
    findTheWinningTeam()
}

//Function to find the winning team in each match using Random function 
function findTheWinningTeam(){
    totalMatchesList.forEach(match => {
        let teamsInMatch = [match.firstTeam,match.secondTeam]

        let winningTeamInMatch = teamsInMatch[Math.floor(Math.random()*teamsInMatch.length)]
        const winningTactics = ['runs','wickets']
        let wonByTactic = winningTactics[Math.floor(Math.random()*winningTactics.length)]

        if(wonByTactic === 'runs'){
            let runs = Math.round(Math.floor(Math.random()*1000)/4)
            match.winningTeam = winningTeamInMatch,
            match.result=winningTeamInMatch +' won by '+runs+' runs'
        }else if(wonByTactic === 'wickets'){
            let wickets = Math.ceil(Math.random()*10)
            match.winningTeam = winningTeamInMatch,
            match.result=winningTeamInMatch +' won by '+wickets+' wickets'
        }
    })
    printScheduleAndResult()
    printPointsTable()
}

//Function to print the schedule and result 
function printScheduleAndResult(){
    console.log(tournament.name + ' Tournament Schedule');
    //Printing the match schedule
    totalMatchesList.forEach(match =>{
        console.log('----------------------------------------------');
        console.log('Id: '+match.matchId);
        console.log('Match No: '+match.matchNumber);
        console.log(match.firstTeam + ' vs '+match.secondTeam);
        console.log('Date: '+match.scheduledDate.toString().substring(0,15));
        if(match.scheduledTime == slotOne)
            console.log('Time: '+match.scheduledTime.slot_1);
        else if(match.scheduledTime == slotTwo)
            console.log('Time: '+match.scheduledTime.slot_2)
    })

    //Printing the result of each match
    console.log('----------------------------------------------\n')
    console.log('Result of Match')
    console.log('----------------------------------------------\n')
    totalMatchesList.forEach(match => {
        console.log('Match No: '+match.matchNumber.toString().padEnd(2,' ') + ' ' +match.result);
    });
}


//Function to print the points table of the tournament
function printPointsTable(){
    console.log('\nPoints Table')
    console.log('--------------------------------------------\n')

    const dummyTeam = -1
    tournament.teams.forEach(team =>{
        if(team !== dummyTeam ){
            let points = 0
            totalMatchesList.forEach(match =>{
                let winningTeam = match.winningTeam
                if(team === winningTeam){
                    points+=2
                }
            })
            console.log(team.padEnd(20,' ')+' '+points+ ' points')
        }
    })
}