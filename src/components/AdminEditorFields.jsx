import ProceedArrow from "../../assets/icons/proceed-arrow.svg";
import {useState} from 'react';
import {Pressable,Text,TextInput,View} from 'react-native';
import {styles as s} from '../styles/adminEditor.styles';
export function EditorField({label,value,onChange,multiline=false}) {
 return <View style={s.field}><Text style={s.label}>{label} <Text style={s.required}>*</Text></Text><TextInput accessibilityLabel={label} value={value} onChangeText={onChange} multiline={multiline} maxLength={multiline?300:100} style={[s.input,multiline&&s.description]}/>{multiline&&<Text style={s.counter}>{value.length}/300</Text>}</View>;
}
export function EditorSelect({label,value,options,onChange}) {
 const [open,setOpen]=useState(false);
 return <View style={s.field}><Text style={s.label}>{label} <Text style={s.required}>*</Text></Text><Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{expanded:open}} onPress={()=>setOpen(!open)} style={s.select}><Text style={s.inputText}>{value}</Text><ProceedArrow color="#6C757D" style={open ? s.arrowUp : s.arrowDown} accessible={false} /></Pressable>{open&&<View style={s.options}>{options.map(v=><Pressable key={String(v)} style={s.option} onPress={()=>{onChange(v);setOpen(false);}}><Text style={s.inputText}>{v}</Text></Pressable>)}</View>}</View>;
}
export function EditorActions({onCancel,onSave,saveLabel='Save'}) {
 return <View style={s.actions}>{onCancel&&<Pressable accessibilityRole="button" style={s.cancel} onPress={onCancel}><Text style={s.cancelText}>Cancel</Text></Pressable>}<Pressable accessibilityRole="button" style={s.save} onPress={onSave}><Text style={s.saveText}>{saveLabel}</Text></Pressable></View>;
}
