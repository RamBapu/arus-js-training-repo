//Android Version Releases for OnePlus Nord

const andriodReleases =
{
    name:'OnePlus Nord',
    releasedOn:new Date('July 21 2020'),
    versions: 
    [{
        version: 'AC2001_11.F.11​',
        releaseDate:new Date('May 15 2022'),
        features:['Improved system stability','Updated Android Security Patch to 2022.04'],
        bugs:['BGSG01','BGBA02','BGOK03'],
        authors:['A','B','C','F'],
        type:'enhancement'
    },{
        version: 'AC2001_11.F.11 beta​',
        releaseDate:new Date('May 12 2022'),
        features:['Updated Android Security Patch'],
        bugs:['BGSG01','BGBA02','BGOK03'],
        authors:['B','C'],
        type:'patch'
    },{
        version: 'AC2001_11.F.10​',
        releaseDate:new Date('2022 Apr 24'),
        features:['Dark mode','Shelf','Work Life Balance','Gallery Update','Canvas AOD'],
        bugs:['BGQC07'],
        authors:['A','C','D','E','F'],
        type:'major' 
    },{
        version: '11.1.10.10',
        releaseDate:new Date('2022-03-26'),
        features:['Improved system stability','Updated Android Security Patch'],
        bugs:['BGGG10'],
        authors:['F','G'],
        type:'patch'
    },{
        version: '11.1.9.9',
        releaseDate:new Date('February 25, 2022'),
        features:['Fixed Freezing issue when sharing pictures in Gallery'],
        bugs:['BGCP08'],
        authors:['F','G','H'],
        type:'enhancement'
    },{
        version: '11.1.8.8',
        releaseDate:new Date('January 28, 2022'),
        features:['Improve system stability','Updated Android security patch'],
        bugs:['BGGL04'],
        authors:['G','H'],
        type:'patch'
    },{
        version: '11.1.7.7',
        releaseDate:new Date('December 17, 2021'),
        features:['Fixed the low probability call forwarding failure issue',''],
        bugs:['BGTH06'],
        authors:['H','I','J'],
        type:'patch'
    },{
        version: '11.1.6.6',
        releaseDate:new Date('October 22, 2021'),
        features:['OnePlus Store'],
        bugs:['BGCF09','BGSG05'],
        authors:['J','K'],
        type:'patch'
    }]
}

//Bugs Found in Android Releases 
const bugs =
[{
    bugNumber:1,
    bugId:'BGTS01',
    description:'abnormal Touch sounds',
},{
    bugNumber:2,
    bugId:'BGBA02',
    description:'abnormal boot animation',
},{
    bugNumber:3,
    bugId:'BGOK03',
    description:'unable to start “OK Google” with voice',
},{
    bugNumber:4,
    bugId:'BGGL04',
    description:'freezing issue when sharing photos with Gallery app'
},{
    bugNumber:5,
    bugId:'BGSG05',
    description:'screen will glitch in specific scenarios when calling'
},{
    bugNumber:6,
    bugId:'BGTH06',
    description:'abnormal display of thumbnail'
},{
    bugNumber:7,
    bugId:'BGQC07',
    description:'abnormal display of Quick device connect'
},{
    bugNumber:8,
    bugId:'BGCP08',
    description:'camera crash when shooting photos in Portrait mode'
},{
    bugNumber:9,
    bugId:'BGCF09',
    description:'low probability call forwarding failure issue'
},{
    bugNumber:10,
    bugId:'BGGG10',
    description:'gallery glitters and slows down'
}]

const versions = andriodReleases.versions
let year =  new Date('2022-08-20').getFullYear()
findAllReleasesMadeInYear(year)
findTheReleaseWithBugId('BGOK03')
findTheAuthorWorkedInManyReleases()
findAllReleasesInMajor('major')
findAllVersionsByFeatureName('system')

//Find how many releases made in a single year
function findAllReleasesMadeInYear(year){
    let release = 0
    versions.forEach(version => {
        if(version.releaseDate.getFullYear() === year)
            release++
    });
    console.log('\nReleases made in year 2022: '+release+'\n');
}

//Find all the releases with the bugId 'BGOK03'
function findTheReleaseWithBugId(bugId){
    versions.forEach(version => {
        version.bugs.forEach(versionBug =>{
            if(versionBug === bugId){
                bugs.forEach((bug)=>{
                    if(bug.bugId === bugId){
                        console.log('Release with bugId '+bugId +' (description: ' +bug.description +'): '+version.version)
                    }
                })
            }   
        })
    });
}

//Find the Author who worked in Maximum releases
function findTheAuthorWorkedInManyReleases(){
    const authorVersionMap = new Map()
    versions.forEach(version =>{
        version.authors.forEach(author =>{
            let noOfReleases = authorVersionMap.get(author) ?? 0
            authorVersionMap.set(author,noOfReleases+=1)
        })
    })

    let authorWorkedInMostReleases = {
        author:'',
        versionWorked:0
    }
    authorVersionMap.forEach((versionWorked,author) =>{
        if(authorWorkedInMostReleases.versionWorked < versionWorked){
            authorWorkedInMostReleases ={ author,versionWorked}
        }
    })
    console.log('Author worked in most releases: '+authorWorkedInMostReleases.author)
}

//Finding all major releases
function findAllReleasesInMajor(versionType){
    versions.forEach(version => {
        if(version.type === versionType){
            console.log('\n'+versionType.toUpperCase() + ' release version is '+version.version +' released on '+version.releaseDate.toString().substring(4,15));
        }
    });
}

//Finding all versions having the feature name 'system'
function findAllVersionsByFeatureName(featureName){
    console.log('\nVersions with feature name: '+featureName)
    versions.forEach(version => {
        for(let feature of version.features){
            let featureWords = feature.split(' ')
            for(let word of featureWords){
                if(word == featureName){
                     console.log('Version : '+version.version);
                }
            }
        }
    })
}
