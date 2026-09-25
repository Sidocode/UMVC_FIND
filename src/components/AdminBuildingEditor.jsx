import ProceedArrow from "../../assets/icons/proceed-arrow.svg";
import {useState} from 'react';
import {Image} from 'expo-image';
import {Modal,Pressable,ScrollView,Text,View,useWindowDimensions} from 'react-native';
import CloseIcon from '../../assets/icons/close.svg';
import EditIcon from '../../assets/admin/dashboard-edit.svg';
import BuildingIcon from '../../assets/admin/dashboard-building.svg';
import {categoryColors,statusColors} from '../data/adminBuildings';
import {createBuildingDraft,resizeBuildingFloors,updateDraftRoom} from '../data/adminEditor';
import {EditorField,EditorSelect,EditorActions} from './AdminEditorFields';
import AdminFloorsEditor from './AdminFloorsEditor';
import AdminRoomEditor from './AdminRoomEditor';
import {styles as s} from '../styles/adminEditor.styles';

export default function AdminBuildingEditor({building,onCancel,onSave}) {
 const [draft,setDraft]=useState(()=>createBuildingDraft(building));
 const [page,setPage]=useState('building'),[room,setRoom]=useState(null),[error,setError]=useState('');
 const compact=useWindowDimensions().width<760;
 const back=()=>page==='room'?setPage('floors'):page==='floors'?setPage('building'):onCancel();
 const save=()=>{if(!draft.name.trim()||!draft.description.trim()){setError('Building name and description are required.');return;}onSave({...draft,image:building.image,name:draft.name.trim(),description:draft.description.trim()});};
 const setFloors=n=>{const next=resizeBuildingFloors(draft,n);if(!next){setError('These floors contain rooms and cannot be removed here.');return;}setError('');setDraft(next);};
 return <Modal transparent visible animationType="fade" onRequestClose={back}><View style={s.overlay}><View style={s.backdrop}/><View style={[s.dialog,page==='room'?s.roomDialog:page==='floors'?s.floorsDialog:s.buildingDialog]}>
  {/* One modal shell: navigating deeper preserves the entire building draft. */}
  <View style={s.header}>{page==='floors'?<Pressable accessibilityRole="button" accessibilityLabel="Back to building" onPress={back}><Text style={s.backArrow}>↶</Text></Pressable>:<EditIcon width={52} height={46}/>}<Text style={s.title}>{page==='room'?'Edit Room':page==='floors'?'Floors & Rooms':'Edit Building'}</Text><Pressable accessibilityRole="button" accessibilityLabel="Close current editor" style={s.close} onPress={back}><CloseIcon/></Pressable></View>
  <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={s.content}>
   <View style={page==='building'?undefined:s.hidden}>
    <View style={[s.columns,compact&&s.stacked]}><View style={s.photoColumn}>{/* Fixed building photo: display only. */}<Image source={building.image} style={s.photo} contentFit="cover"/></View><View style={s.formColumn}>
     <EditorField label="Building Name" value={draft.name} onChange={name=>setDraft({...draft,name})}/><EditorSelect label="Category" value={draft.category} options={Object.keys(categoryColors)} onChange={category=>setDraft({...draft,category})}/><EditorSelect label="Floors" value={draft.floors} options={Array.from({length:Math.max(10,draft.floors)},(_,i)=>i+1)} onChange={setFloors}/><EditorSelect label="Status" value={draft.status} options={Object.keys(statusColors)} onChange={status=>setDraft({...draft,status})}/><EditorField label="Description" multiline value={draft.description||''} onChange={description=>setDraft({...draft,description})}/>
    </View></View>{!!error&&<Text style={s.error}>{error}</Text>}<Pressable accessibilityRole="button" onPress={()=>setPage('floors')} style={s.manage}><BuildingIcon width={32} height={32}/><Text style={s.manageText}>Manage Floors and Rooms</Text><ProceedArrow color="#A42330" accessible={false} /></Pressable><EditorActions onCancel={onCancel} onSave={save}/>
   </View>
   <View style={page==='floors'?undefined:s.hidden}><AdminFloorsEditor building={draft} onDone={()=>setPage('building')} onEditRoom={(floorId,value)=>{setRoom({floorId,value});setPage('room');}}/></View>
   {page==='room'&&room&&<AdminRoomEditor key={room.value.id} room={room.value} onCancel={()=>setPage('floors')} onSave={value=>{setDraft(d=>updateDraftRoom(d,room.floorId,value));setPage('floors');}}/>}
  </ScrollView>
 </View></View></Modal>;
}
