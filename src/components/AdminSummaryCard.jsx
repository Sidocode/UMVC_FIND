import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles/adminDashboard.styles';
export default function AdminSummaryCard({label,count,Icon,onPress,selected}) {
 return <Pressable accessibilityRole="button" accessibilityState={{selected}} onPress={onPress} style={[styles.summary,selected&&styles.selected]}><View style={styles.iconCircle}><Icon width={28} height={28}/></View><View style={styles.summaryCopy}><Text style={styles.small}>{label}</Text><Text style={styles.count}>{count}</Text></View><Text style={styles.chevron}>›</Text></Pressable>;
}
