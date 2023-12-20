/** `function useSV(){useSV={author:"getClientInfo"};let {wtf_title}=SV.Ts; SV.App=..; SV.Ts.now={name:"appID"} }` */
interface SVApp {
  set App(main: () => void)
  Ts: {
    set now(addTranslates: object)
  }
}

type blicks = number; type secs = number;
type Range = [number, number];
type FnPt = [number, number];
/** try `(cur=SEd.currentGroup:Ref.target.Notes)
 * .push({lyrics:"la"},{lyrics:"ha"})`; `cur.pop();cur[0].drop()` */
interface SEArray<T> extends Array<T> {
  set(willSelect: (x: T) => boolean);
}

declare global {
  interface Window {
    /** `SE.Groups || SE.Notes`, try `if(g=SE.Grp[0])` for note-editing purpose */
    SE: NotesSelection
    /** `SP.seek(0);SP.play()`, Ctrl+Space `stop()` resets to 0s. seconds<=>blicks see [TimeAxis] */
    SP: PlayBackControl
    /** `Tracks, NoteGroups, filename`  */
    s5p: Project

    /** `current(Main)Group, currentTrack` */
    SEd: MainEditorView
    SEtop: ArrangementView
    SVjs: SV
    SV: SV

    /** see https://github.com/Dreamtonics/svstudio-scripts for widgets dialogs */
    alert(s: string, ok?: () => void)
    confirm(s: string, ok?: (quest: boolean) => void)
    prompt(s: string, v0: string, ok?: (s: string) => void)
    /** only JSON values are allowed to receive by Hachi Chrome ext */
    pipe: { send(s: string) }
  }
}



interface Note extends NestedObject {
  lyrics: string; pitch: number;
  onset: blicks; duration: blicks;
  attributes: ParamNote;
  phonemes: string;

  get end(): blicks;
  setTimeRange: (onset: blicks, duration: blicks) => void;
  clone: () => Note;
}

interface NoteGroup extends NestedObject {
  get Notes(): Note[]
  name: string;
  getParameter(typeName: string): ParamFn;

  get UUID(): string;
  get numNotes(): number;
  addNote: (note: Note) => number;
  getNote: (index: number) => Note;
  removeNote: (index: number) => void;
  clone: () => NoteGroup;
}

interface Group/*Ref*/ extends NestedObject {
  timeOffset: blicks; pitchOffset: number;
  target: NoteGroup; voice: ParamNote;
  get duration(): blicks;
  get end(): blicks;
  get onset(): blicks;

  isInstrumental: () => boolean;
  clone: () => Group;
  isMain: () => boolean;
}

interface PlayBackControl extends NestedObject {
  get playhead(): secs;
  seek(T: secs);
  get status(): string;
  play: () => void;
  pause: () => void;
  loop: (T0: secs, T1: secs) => void;
  stop: () => void;

  set onchange(ev: (st: string) => boolean?)
}

interface MainEditorView extends ArrangementView {
  get selection(): NotesSelection;
  get currentGroup(): Group;
  get currentTrack(): Track;
}
interface ArrangementView extends NestedObject {
  get selection(): Selection;
  get navigation(): CoordinateSystem;
}

interface AutomationInfo {
  typeName: string //pitchDelta vibratoEnv loudness tension breathiness voicing gender
  displayName: string
  range: Range
  defaultValue: number
}

interface ParamFn extends NestedObject {
  get definition(): AutomationInfo;
  getPoints: (t0: blicks, t1: blicks) => FnPt[]; get allPoints(): FnPt[];
  add: (t: blicks, v: number) => boolean;
  get: (t: blicks) => number;

  remove: (t: blicks) => boolean; removeAll: () => void;
  getLinear: (t: blicks) => number;
  simplify: (t0: blicks, t1: blicks, threshold?: number) => boolean;
  get interpolationMethod(): string;
  clone: () => ParamFn;
}

interface ParamNote {
  tF0Offset?: number //pitch transition - offset (seconds)
  tF0Left?: number //pitch transition - duration left (seconds)
  tF0Right?: number// pitch transition - duration right (seconds)
  dF0Left?: number //pitch transition - depth left (semitones)
  dF0Right?: number// pitch transition - depth right (semitones)
  tF0VbrStart?: number// vibrato - start (seconds)
  tF0VbrLeft?: number //vibrato - left (seconds)
  tF0VbrRight?: number// vibrato - right (seconds)
  dF0Vbr?: number //vibrato - depth (semitones)
  pF0Vbr?: number //vibrato - phase (radian, from -π to π)
  fF0Vbr?: number //vibrato - frequency (Hz)
  tNoteOffset?: number // timing and phonemes - note offset (seconds)
  exprGroup?: string //expression group
  dur?: number[] // for phoneme duration scaling
  alt?: number[] // for phoneme alternative pronunciation  
}

interface Project extends NestedObject {
  get Tracks(): Track[];
  get NoteGroups(): NoteGroup[];
  get duration(): number;
  get fileName(): string;
  get timeAxis(): TimeAxis;
  newUndoRecord: () => void;

  get numNoteGroupsInLibrary(): number;
  getNoteGroup: (id: number | string) => NoteGroup | undefined;
  addNoteGroup: (group: NoteGroup, index?: number) => number;
  removeNoteGroup: (index: number) => void;
  get numTracks(): number;
  getTrack(): Track;
  addTrack: (track: Track) => number;
  removeTrack: (index: number) => void;
}
interface Track extends NestedObject {
  name: string; get duration(): number;
  /** #66ccff */
  displayColor: string;
  displayOrder: number;
  isBounced: () => boolean; set bounced(enabled: boolean);

  get numGroups(): string;
  getGroupReference: (index: number) => Group;
  addGroupReference: (group: Group) => number;
  removeGroupReference: (index: number) => void;
  clone: () => Track;
}

interface Selection extends NestedObject {
  get Groups(): SEArray<Group>;
  hasUnfinishedEdits: () => boolean;
  /** may use select(g._) if err */
  selectGroup: (reference: Group) => void;
  unselectGroup: (reference: Group) => boolean;
  clearGroups: () => boolean;

  hasSelectedGroups: () => boolean;
  hasSelectedContent: () => boolean;
  clearAll: () => boolean;
}
interface NotesSelection extends Selection {
  get Notes(): SEArray<Note>;

  selectNote: (note: Note) => void;
  unselectNote: (note: Note) => boolean;
  clearNotes: () => boolean;
  hasSelectedNotes: () => boolean;
}

interface CoordinateSystem extends NestedObject {
  set timeScale(scale: number);
  set valueCenter(y: number);
  snap: (t: number) => void;

  get timePxPerUnit(): number; get valuePxPerUnit(): number;
  get timeViewRange(): Range; get valueViewRange(): Range;
  set timeLeft(time: number); set timeRight(time: number);
  /** (t-timeLeft)*timePxPer1. SynthV 1.8 has no "screen" axis or eventListeners */
  t2x: (t: number) => number; v2y: (v: number) => number;
  x2t: (x: number) => number; y2v: (y: number) => number;
}

interface SV extends SVApp {
  create: (type: string) => object;
  setTimeout: (msec: number, callback: () => any) => void;
  finish: () => void;
  QUARTER: number;
  blackKey: (k: number) => boolean;
  /** SEd,s5p,SEtop,SP */
  get mainEditor(): MainEditorView;
  get project(): Project;
  get arrangement(): ArrangementView;
  get playback(): PlayBackControl;
  hostClipboard: string;
  getPhonemesForGroup: (group: Group) => Array<string>;

  showCustomDialog: (form: object) => object;
  showCustomDialogAsync: (form: object, callback: () => any) => void;
  showInputBox: (title: string, message: string, defaultText: string) => string;
  showInputBoxAsync: (title: string, message: string, defaultText: string, callback: (ret: string) => any) => void;
  showMessageBox: (title: string, message: string) => void;
  showMessageBoxAsync: (title: string, message: string, callback?: () => any) => void;
  showOkCancelBox: (title: string, message: string) => boolean;
  showOkCancelBoxAsync: (title: string, message: string, callback: (ret: boolean) => any) => void;
  showYesNoCancelBox: (title: string, message: string) => string;
  showYesNoCancelBoxAsync: (title: string, message: string, callback: (ret: string) => any) => void;
  get hostInfo(): {
    osType: string //"Windows", "macOS", "Linux", "Unknown"
    languageCode: string //"en-us", "ja-jp", "zh-cn"
    osName: string //the full name of the operating system
    hostName: string //"Synthesizer V Studio Pro" or "Synthesizer V Studio Basic(what?)"
    hostVersion: string //the version string of Synthesizer V Studio e.g. "1.0.4"
    hostVersionNumber: number //the version number defined as taking major, minor and revision as 2-digit hexadecimals (e.g. 0x01_00_04 for "1.0.4")
  };

  blick2Quarter: (t: number) => number;
  blick2Seconds: (t: number, bpm: number) => number;
  freq2Pitch: (f: number) => number;
  seconds2Blick: (s: number, bpm: number) => number;
  quarter2Blick: (q: number) => number;
  pitch2Freq: (p: number) => number;

  blickRoundDiv: (dividend: number, divisor: number) => number;
  /** try `navigation.snap(t)` */
  blickRoundTo: (t: number, interval: number) => number;
  T: (text: string) => string;
}

interface NestedObject {
  get indexInParent(): number;
  get parent(): NestedObject | undefined;
  isMemoryManaged: () => boolean;
}

/** try `note.onset=SP.now(), SP.nowAt(note||note.onset)` */
interface TimeAxis extends NestedObject {
  get allMeasureMarks(): Array<object>;
  get allTempoMarks(): Array<object>;
  getBlickFromSeconds: (t: number) => number;
  getSecondsFromBlick: (t: number) => number;
  getMeasureAt: (t: number) => number;
  getMeasureMarkAt: (measureNumber: number) => object;
  getTempoMarkAt: (t: number) => number;

  addMeasureMark: (measure: number, numerator: number, denominator: number) => void;
  addTempoMark: (t: number, bpm: number) => void;
  removeMeasureMark: (measure: number) => boolean;
  removeTempoMark: (t: number) => boolean;
  getMeasureMarkAtBlick: (t: number) => object;
  clone: () => TimeAxis;
}

