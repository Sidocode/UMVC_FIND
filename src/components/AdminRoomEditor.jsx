import {useState} from 'react';
import {Text} from 'react-native';
import {EditorField,EditorSelect,EditorActions} from './AdminEditorFields';
import {styles as s} from '../styles/adminEditor.styles';
export default function AdminRoomEditor({room,onCancel,onSave}) {
 const [draft,setDraft]=useState({...room}),[error,setError]=useState('');
 const save=()=>{if(!draft.name.trim()||!draft.description.trim()){setError('Room name and description are required.');return;}onSave({...draft,name:draft.name.trim(),description:draft.description.trim()});};
 return <><EditorField label="Room Name" value={draft.name} onChange={name=>setDraft({...draft,name})}/><EditorSelect label="Room Type" value={draft.type} options={Array.from(new Set([draft.type,'Classroom','Laboratory','Office','Other']))} onChange={type=>setDraft({...draft,type})}/><EditorField label="Description" multiline value={draft.description||''} onChange={description=>setDraft({...draft,description})}/>{!!error&&<Text style={s.error}>{error}</Text>}<EditorActions onCancel={onCancel} onSave={save}/></>;
}
