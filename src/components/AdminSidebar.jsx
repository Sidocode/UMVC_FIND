import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import Waves from '../../assets/admin/dashboard-waves.svg';
import { styles } from '../styles/adminDashboard.styles';
export default function AdminSidebar({compact}) {
 return <View style={[styles.sidebar,compact&&styles.sidebarCompact]}><Image source={require('../../assets/admin/campus.png')} style={styles.sidebarPhoto} contentFit="cover"/><View style={styles.brandRow}><Image source={require('../../assets/admin/logo.png')} style={styles.logo} contentFit="contain"/><View><Text style={styles.brand}>UMVC</Text><Text style={[styles.brand,styles.gold]}>FIND</Text></View></View><View style={styles.sidebarWaves}><Waves width="100%" height="100%" preserveAspectRatio="none"/></View></View>;
}
