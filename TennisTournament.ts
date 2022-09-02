//Interface for Tennis Grand Slam Tournament
interface TennisGrandSlamTournament{
    name:string,
    players:Players[],
    startDate:Date
}

//Interface for Players
interface Players{
    name:string,
    rank:number
} 

//Interface for match
interface Match{
    matchNumber:number,
    firstPlayer:string,
    firstPlayerRank:number,
    secondPlayer:string,
    secondPlayerRank:number,
    matchId:number,
    firstPlayerWinPercent:number,
    secondPlayerWinPercent:number,
    winner:string
}

//Tennis Grand Slam Tournament for Men
const tennisGrandSlamTournament = {
    name: "Men's Single Wimbledon 2022 Tournament",
    players:[
        {name:'Novak Djokovic',rank:1},
        {name:'Rafael Nadal',rank:2},
        {name:'Casper Rudd',rank:3},
        {name:'Stefanos Tsitsipas',rank:4},
        {name:'Carlos Alacaraz',rank:5},
        {name:'Felix Auger-Aliassime',rank:6},
        {name:'Hubert Hukacz',rank:7},
        {name:'Matteo Berrettini',rank:8},
        {name:'Cameron Norrie',rank:9},
        {name:'Jannik Sinner',rank:10},
        {name:'Taylor Fritz',rank:11},
        {name:'Diego Schwatzman',rank:12},
        {name:'Denis Shapovalov',rank:13},
        {name:'Marin Cilic',rank:14},
        {name:'Reilly Opelka',rank:15},
        {name:'Pablo Carreno Busta',rank:16}
    ],
    startDate: new Date()
}

generateRounds(1,tennisGrandSlamTournament.players)

//Generate Single Tournament Rounds for Tennis players 
function generateRounds(level:number,players:Players[])
{
    let matchesList = []
    let numberOfMatches = players.length/2
    let matchNumber = 1
     
    if(level === 1){
        for(let i=1;i<=numberOfMatches;i++){
            const match ={
                matchNumber:matchNumber++,
                firstPlayer:players[i-1].name,
                firstPlayerRank:players[i-1].rank,
                secondPlayer:players[players.length-i].name,
                secondPlayerRank:players[players.length-i].rank,
            }
            matchesList.push(match)
        }
    }else{
        for(let i=0;i<players.length;i+=2){  
            const match ={ 
                matchNumber:matchNumber++,
                firstPlayer:players[i].name, 
                firstPlayerRank:players[i].rank,
                secondPlayer:players[i+1].name, 
                secondPlayerRank:players[i+1].rank,
            }
            matchesList.push(match)
        }
    }

    //Schuffling matches and generating the first round of tournament
    if(level === 1 && numberOfMatches > 1){
        const oddMatches = matchesList.filter(match =>match.matchNumber%2 !== 0)
        const matchesInReverseOrder = matchesList.reverse()
        const evenMatches = matchesInReverseOrder.filter(match => match.matchNumber%2 === 0)
        matchesList = []
        for(let i=0;i<numberOfMatches/2;i++){
            matchesList.push(oddMatches[i])
            matchesList.push(evenMatches[i])
        }  
    }
    generateWinningProbability(level,matchesList)
}

//Generate the winning probability of each player in a match
function generateWinningProbability(level:number,matchesList:any){
    let winners:any = []
    let matchNumber = 1
    matchesList.forEach((match:Match) =>{
        match.matchId = matchNumber++
        let winningProbabilityOfEachPlayer = []
        let rankDifference = Math.abs(match.firstPlayerRank - match.secondPlayerRank) 
        let percentBreakUp = 100/(rankDifference+1)
        if(match.firstPlayerRank>match.secondPlayerRank){
            match.firstPlayerWinPercent = percentBreakUp
            match.secondPlayerWinPercent = (percentBreakUp * rankDifference)
        }
        else if(match.secondPlayerRank>match.firstPlayerRank){
            match.firstPlayerWinPercent = (percentBreakUp * rankDifference)
            match.secondPlayerWinPercent = percentBreakUp
        }
        winningProbabilityOfEachPlayer.push(match.firstPlayerWinPercent,match.secondPlayerWinPercent)
        
        let playersInMatch = []
        playersInMatch.push(match.firstPlayer,match.secondPlayer)
        match.winner = findtheWinnerOfEachMatch(playersInMatch,winningProbabilityOfEachPlayer)
        let winnerRank = match.winner === match.firstPlayer ? match.firstPlayerRank : match.secondPlayerRank
        const winner = {
            name:match.winner,
            rank:winnerRank
        }
        winners.push(winner)
    })
    printMatchSchedule(level,matchesList)
    if(winners.length>1){
        level+=1
        generateRounds(level,winners)
    }
}

//Find the winner of each match by probability
function findtheWinnerOfEachMatch(playersInMatch:string[],winningProbabilityOfEachPlayer:any){
    const createDistribution = (winningProbabilityOfEachPlayer:any) =>{
        let distribution = [] 
        for(let i=0;i<winningProbabilityOfEachPlayer.length;i++){
            const limit = winningProbabilityOfEachPlayer[i] 
            for(let j=0;j<Math.round(limit);j++){
                distribution.push(i)
            } 
        } 
        return distribution
    }

    const randomWinnerByProbability = (playersInMatch:string[],distribution:number[]) =>{
        const winnerIndex = distribution[Math.floor(distribution.length*Math.random())]
        return playersInMatch[winnerIndex]
    }

    const distribution = createDistribution(winningProbabilityOfEachPlayer)
    return randomWinnerByProbability(playersInMatch,distribution)
}

//Printing the match schedule for the tournament
function printMatchSchedule(level:number,matchesList:any){
    console.log(`\n------------------------------------ Round : ${level} --------------------------------------`)
    matchesList.forEach((match:Match)=>{
        console.log('Match : '+match.matchId)
        console.log(match.firstPlayer + ' vs ' +match.secondPlayer)
        console.log('Winner : '+match.winner)
    })
}





