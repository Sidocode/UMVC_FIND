import ProceedArrow from "../../assets/icons/proceed-arrow.svg";
import {useState} from 'react';
import {Pressable,Text,View} from 'react-native';
import BuildingIcon from '../../assets/admin/dashboard-building.svg';
import EditIcon from '../../assets/admin/dashboard-edit.svg';
import {EditorActions} from './AdminEditorFields';
import {styles as s} from '../styles/adminEditor.styles';
export default function AdminFloorsEditor({building,onEditRoom,onDone}) {
 const [expanded,setExpanded]=useState(building.floorRooms[0]?.id);
 return <><Text style={s.buildingSubtitle}>{building.name}</Text>{building.floorRooms.map(f=><View key={f.id} style={s.floorBlock}><Pressable accessibilityRole="button" accessibilityState={{expanded:expanded===f.id}} style={s.floorHeading} onPress={()=>setExpanded(expanded===f.id?null:f.id)}><BuildingIcon width={28} height={28}/><Text style={s.floorTitle}>Floor {f.number}</Text><ProceedArrow color="#6C757D" style={expanded === f.id ? s.arrowUp : s.arrowDown} accessible={false} /></Pressable>{expanded===f.id&&<><View style={s.roomRow}>{['Room No.','Room Type','Action'].map(t=><Text key={t} style={[s.cell,s.tableHeading]}>{t}</Text>)}</View>{f.rooms.map(r=><View key={r.id} style={s.roomRow}><Text style={s.cell}>{r.name.replace(/^Room /,'')}</Text><Text style={s.cell}>{r.type}</Text><View style={s.cell}><Pressable accessibilityRole="button" accessibilityLabel={'Edit '+r.name} onPress={()=>onEditRoom(f.id,r)} style={s.editButton}><EditIcon width={44} height={36}/></Pressable></View></View>)}{!f.rooms.length&&<Text style={s.empty}>No rooms added to this floor yet.</Text>}</>}</View>)}<EditorActions onSave={onDone} saveLabel="Done"/></>;
}
