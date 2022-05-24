function getTimeforDisplay(timeStamp){
    var now = new Date(timeStamp);
    var dateStr = now.toLocaleDateString();
    var timeStr = now.toLocaleTimeString();
    return dateStr + ' ' + timeStr;
}

function todoSorter(todo1, todo2){
    if (gSortBy === 'TEXT') return (todo1.txt.toLowerCase() <= todo2.txt.toLowerCase())? -1: 1;
    var sortingProperty = (gSortBy === 'CREATED')? 'createdAt': 'importance';
    return todo2[sortingProperty] - todo1[sortingProperty];
}

function getNoTodosMsg(){
    switch(gFilterBy){
        case 'ALL':
            return 'Nothing Left To Do!';
        case 'DONE':
            return 'No Done ToDoes!';
        case 'ACTIVE':
            return 'Looks Like Nothing Needs To Be Done!'
    } 
}