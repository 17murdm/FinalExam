/**
 *   @author Murdock, Matthew (murdockm@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Final exam
 */

"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');

let continueResponse;
let playMusicChoice = [], menuChoice = [], uploadChoice = [], songs = [], userMusic = [], miscSounds = [];
let songName, songAuthor;

function main() {
    if (continueResponse !== 0 && continueResponse !== 1) {
        setContinueResponse();
}
while (continueResponse === 1) {
        setMenuChoice();
        switch (menuChoice) {
            case 1: setUploadChoice();
                break;
            case 2: setPlayMusicChoice();
                break;
        }
        setContinueResponse();
    }
}

main();

function setContinueResponse() {
    if (continueResponse) {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        }
    } else {
        continueResponse = 1;
    }
}

function setMenuChoice() {
    menuChoice = -1;
    while (menuChoice !== 1 && menuChoice !== 2 && menuChoice !== 3 && menuChoice !== 4 && menuChoice !== 5) {
        menuChoice = Number(PROMPT.question(
            `\tPlease make an action
            \t\t1) Upload Music
            \t\t2) Play Music
            \t\t3) Shuffle Songs
            \t\t4) Delete Music
            `))
    }
}

function setUploadChoice() {
    uploadChoice = -1;
    while (uploadChoice !== 1 && uploadChoice !== 2 && uploadChoice !==3 && uploadChoice !== 4) {
        uploadChoice = Number(PROMPT.question(
            `\tWhere would you like to upload this song?
            \t\t1) Songs
            \t\t2) User Music
            \t\t3) Misc Sounds
            \t\t4) Back
            `));
        switch (uploadChoice) {
            case 1: writeSongs(); setSongName(); setSongAuthor();
                break;
            case 2: setSongName(); setSongAuthor();
                break;
            case 3: setSongName(); setSongAuthor();
                break;
            case 4: return setMenuChoice();
        }
    }
}

function setSongName() {
    songName = PROMPT.question(`\nWhat is the name of the song? `)
}

function setSongAuthor() {
 songAuthor = PROMPT.question(`\nWho is this song wrote by? `)
}

function setPlayMusicChoice() {
    playMusicChoice = -1;
    while (playMusicChoice !== 1 && playMusicChoice !== 2 && playMusicChoice !==3 && playMusicChoice !== 4) {
        uploadChoice = Number(PROMPT.question(
            `\tWhat playlist would you like to play from?
            \t\t1) ...songs
            \t\t2) ...my music
            \t\t3) ...misc sounds
            \t\t4) Back
            `));
        switch (uploadChoice) {
            case 1: loadSongs();
                break;
            case 2: loadUserMusic();
                break;
            case 3: loadMiscSounds();
                break;
            case 4: return setMenuChoice();
        }
    }
}

function loadSongs() {
    let SongsFile = IO.readFileSync(`Song_Data/Songs.csv`, `utf8`);
    let lines = SongsFile.toString().split(/\r?\n/);
    console.log(lines);
    for (let i = 0; i < lines.length; i++) {
        songs.push(lines[i].toString().split(/,/))
    }
}

function loadUserMusic() {
    let userMusicFile = IO.readFileSync(`Song_Data/User_Music.csv`, `utf8`);
    let lines = userMusicFile.toString().split(/\r?\n/);
    console.log(lines);
    for (let i = 0; i < lines.length; i++) {
        userMusic.push(lines[i].toString().split(/,/))
    }
}

function loadMiscSounds() {
    let miscSoundsFile = IO.readFileSync(`Song_Data/Misc_Sounds.csv`, `utf8`);
    let lines = miscSoundsFile.toString().split(/\r?\n/);
    console.log(lines);
    for (let i = 0; i < lines.length; i++) {
        miscSounds.push(lines[i].toString().split(/,/))
    }
}

function writeSongs() {
    const COLUMNS = 2;
    for (let i = 0; i < songs.length; i++) {
        if (songs[i]) {
            for (let j = 0; j < COLUMNS; j++) {
                if (j < COLUMNS - 1) {
                    IO.appendFileSync(`Song_Data/Songs.csv`, `${songs[i][j]},`);
                } else if (i < songs.length - 1) {
                    IO.appendFileSync(`Song_Data/Songs.csv`, `${songs[i][j]}\n`);
                } else {
                    IO.appendFileSync(`Song_Data/Songs.csv`, `${songs[i][j]}`);
                }
            }
        }
    }
    IO.unlinkSync(`Song_Data/songs.csv`);
}
