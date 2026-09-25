import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import EditIcon from '../../assets/admin/dashboard-edit.svg';
import { categoryColors,statusColors } from '../data/adminBuildings';
import { styles } from '../styles/adminDashboard.styles';
export default function AdminBuildingRow({building,onEdit}) {
 return <View style={styles.row}><View style={styles.nameColumn}><Image source={building.image} style={styles.thumbnail} contentFit="cover"/><View style={styles.rowCopy}><Text style={styles.buildingName}>{building.name}</Text><Text style={styles.rowDescription}>{building.description}</Text></View></View><View style={styles.column}><Text style={[styles.badge,{backgroundColor:categoryColors[building.category]}]}>{building.category}</Text></View><Text style={[styles.column,styles.floorCount]}>{building.floors}</Text><View style={styles.column}><Text style={[styles.badge,{backgroundColor:statusColors[building.status]},building.status==="Maintenance"&&styles.maintenanceText]}>{building.status}</Text></View><View style={styles.actionColumn}><Pressable accessibilityRole="button" accessibilityLabel={'Edit '+building.name} onPress={()=>onEdit(building)} style={styles.editButton}><EditIcon width={34} height={30}/></Pressable></View></View>;
}
