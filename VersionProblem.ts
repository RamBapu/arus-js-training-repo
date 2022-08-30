interface AndriodReleases{
    name:string,
    releasedOn:Date,
    versions:Versions[]
}

interface Versions{
    version:string,
    releaseDate:Date,
    features:string[],
    bugs:string[],
    authors:string[],
    type:ReleaseType
}

enum ReleaseType{
    major,
    patch,
    enhancement
}

const andriodReleases:AndriodReleases =
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
        type:ReleaseType.enhancement
    },{
        version: 'AC2001_11.F.11 beta​',
        releaseDate:new Date('May 12 2022'),
        features:['Updated Android Security Patch'],
        bugs:['BGSG01','BGBA02','BGOK03'],
        authors:['B','C'],
        type:ReleaseType.patch
    },{
        version: 'AC2001_11.F.10​',
        releaseDate:new Date('2022 Apr 24'),
        features:['Dark mode','Shelf','Work Life Balance','Gallery Update','Canvas AOD'],
        bugs:['BGQC07'],
        authors:['A','C','D','E','F'],
        type:ReleaseType.major
    },{
        version: '11.1.10.10',
        releaseDate:new Date('2022-03-26'),
        features:['Improved system stability','Updated Android Security Patch'],
        bugs:['BGGG10'],
        authors:['F','G'],
        type:ReleaseType.patch
    },{
        version: '11.1.9.9',
        releaseDate:new Date('February 25, 2022'),
        features:['Fixed Freezing issue when sharing pictures in Gallery'],
        bugs:['BGCP08'],
        authors:['F','G','H'],
        type:ReleaseType.enhancement
    },{
        version: '11.1.8.8',
        releaseDate:new Date('January 28, 2022'),
        features:['Improve system stability','Updated Android security patch'],
        bugs:['BGGL04'],
        authors:['G','H'],
        type:ReleaseType.patch
    },{
        version: '11.1.7.7',
        releaseDate:new Date('December 17, 2021'),
        features:['Fixed the low probability call forwarding failure issue',''],
        bugs:['BGTH06'],
        authors:['H','I','J'],
        type:ReleaseType.patch
    },{
        version: '11.1.6.6',
        releaseDate:new Date('October 22, 2021'),
        features:['OnePlus Store'],
        bugs:['BGCF09','BGSG05'],
        authors:['J','K'],
        type:ReleaseType.patch
    }]
}

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
findAllReleasesMadeInYear()
findTheReleaseWithBug()
findTheReleasesAuthorWorked()
findAllReleasesInMajor()
findAllVersionsByFeatureName()

function findAllReleasesMadeInYear(){
    const todayDate = new Date('2022-08-20')
    let year = todayDate.getFullYear()
    let release = 0
    versions.forEach(version => {
        if(version.releaseDate.getFullYear() === year){
            release++
        }
    });
    console.log('Releases made in year 2022: '+release);
}

function findTheReleaseWithBug(){
    let bugId = 'BGOK03'
    versions.forEach(version => {
        version.bugs.forEach(versionBug =>{
            if(versionBug === bugId){
                console.log('Release with bug '+bugId +': '+version.version)
            }
        })
    });
    
}

function findTheReleasesAuthorWorked(){
    let authorList:any[] = []
    let uniqueAuthors: any[] = []
    versions.forEach(version => {
        version.authors.forEach(author => {
            authorList.push(author)   
        });
        uniqueAuthors = [...new Set(authorList)]
    });

    authorList = []
    uniqueAuthors.forEach(author => {
        let release = 1
        versions.forEach(version =>{
            version.authors.forEach(auth => {
                if(author === auth){
                    const authorObj  = {
                        authorName:author,
                        releases:release++
                    }
                    authorList.push(authorObj)
                }
            });
        }) 
    });
    
    let maxRelease = -1
    let maxRelasesByAuthor = ''
    authorList.forEach(author => {
        if(author.releases>maxRelease){
            maxRelease = author.releases
            maxRelasesByAuthor = author.authorName
        }
    });

    console.log('Author worked in many releases: '+maxRelasesByAuthor);
}

function findAllReleasesInMajor(){
    versions.forEach(version => {
        if(version.type == ReleaseType.major){
            console.log('Major Release version is '+version.version +' released on '+version.releaseDate.toString().substring(4,15));
        }
    });
}

function findAllVersionsByFeatureName(){
    const featureName = 'system'
    console.log('Versions with feature: '+featureName)
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