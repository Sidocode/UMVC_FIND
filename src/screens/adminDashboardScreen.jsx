import AdminBuildingEditor from "../components/AdminBuildingEditor";
import SearchIcon from "../../assets/icons/nav-search.svg";
import FilterIcon from "../../assets/icons/map-filter.svg";
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import { Modal,Pressable,ScrollView,Text,TextInput,View,useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BuildingIcon from '../../assets/admin/dashboard-building.svg';
import AcademicIcon from '../../assets/admin/dashboard-academic.svg';
import AdminIcon from '../../assets/admin/dashboard-admin.svg';
import FacilityIcon from '../../assets/admin/dashboard-facility.svg';
import AdminSidebar from '../components/AdminSidebar';
import AdminSummaryCard from '../components/AdminSummaryCard';
import AdminBuildingRow from '../components/AdminBuildingRow';
import {adminBuildings,categoryColors,statusColors} from '../data/adminBuildings';
import {styles} from '../styles/adminDashboard.styles';

export default function AdminDashboardScreen(){
 const router=useRouter();const {width}=useWindowDimensions();const compact=width<900;
 const [records,setRecords]=useState(adminBuildings),[query,setQuery]=useState(''),[category,setCategory]=useState('All Categories'),[filterOpen,setFilterOpen]=useState(false),[draft,setDraft]=useState(null);
 const [loaded]=useFonts({DashboardRegular:require('../../assets/fonts/afacad-flux-latin-400-normal.ttf'),DashboardMedium:require('../../assets/fonts/afacad-flux-latin-500-normal.ttf'),DashboardBrand:require('../../assets/fonts/Angkor-Regular.ttf')});
 const filtered=records.filter(b=>b.name.toLowerCase().includes(query.trim().toLowerCase())&&(category==='All Categories'||(category==='Facilities and Others'?['Facility','Other'].includes(b.category):b.category===category)));
 const summaries=[{label:'Total Buildings',filter:'All Categories',Icon:BuildingIcon,count:records.length},{label:'Academic Buildings',filter:'Academic',Icon:AcademicIcon,count:records.filter(b=>b.category==='Academic').length},{label:'Admin Buildings',filter:'Admin',Icon:AdminIcon,count:records.filter(b=>b.category==='Admin').length},{label:'Facilities and Others',filter:'Facilities and Others',Icon:FacilityIcon,count:records.filter(b=>['Facility','Other'].includes(b.category)).length}];
 if(!loaded)return <View style={styles.loading}><Text>Loading dashboard…</Text></View>;
 return <SafeAreaView style={styles.screen}><View style={[styles.layout,compact&&styles.layoutCompact]}>
  <AdminSidebar compact={compact}/>
  <ScrollView style={styles.main} contentContainerStyle={styles.mainContent} keyboardShouldPersistTaps="handled">
   {/* Page Heading and Admin Account */}
   <View style={styles.header}><View style={styles.headingGroup}><View style={styles.iconCircle}><BuildingIcon width={34} height={34}/></View><View style={styles.headingCopy}><Text style={styles.title}>Location Management</Text><Text style={styles.small}>Manage campus buildings, update information, and keep the map current.</Text></View></View><View style={styles.account}><Image source={require('../../assets/admin/dashboard-user.png')} style={styles.avatar}/><View><Text style={styles.rowName}>Admin User</Text><Text style={styles.small}>Administrator</Text></View><Pressable accessibilityRole="button" onPress={()=>router.replace('/admin')} style={styles.primary}><Text style={styles.white}>Logout</Text></Pressable></View></View>
   <Text style={styles.notice}>Prototype preview · Sample data · Changes are not saved after reload</Text>
   {/* Computed Summary Cards */}
   <View style={styles.summaries}>{summaries.map(item=><AdminSummaryCard key={item.label} {...item} selected={category===item.filter} onPress={()=>setCategory(item.filter)}/>)}</View>
   {/* Search, Category Filter and Building Table */}
   <View style={styles.tablePanel}><View style={styles.toolbar}><View style={styles.searchBox}><SearchIcon width={22} height={22}/><TextInput accessibilityLabel="Search building name" placeholder="Search building name…" value={query} onChangeText={setQuery} style={styles.tableSearch}/></View><Pressable accessibilityRole="button" onPress={()=>setFilterOpen(true)} style={styles.filter}><FilterIcon width={16} height={18} color="#8B959D"/><Text style={styles.filterLabel}>{category}</Text></Pressable></View>
    <ScrollView horizontal contentContainerStyle={styles.tableScroll}><View style={styles.table}><View style={styles.tableHeader}><Text style={[styles.nameColumn,styles.headerText]}>Building Name</Text><Text style={[styles.column,styles.headerText]}>Category</Text><Text style={[styles.column,styles.headerText]}>Floors</Text><Text style={[styles.column,styles.headerText]}>Status</Text><Text style={[styles.actionColumn,styles.headerText]}>Actions</Text></View>{filtered.map(b=><AdminBuildingRow key={b.id} building={b} onEdit={setDraft}/>)}{!filtered.length&&<Text style={styles.empty}>No buildings match your search.</Text>}</View></ScrollView><Text style={styles.resultCount}>Showing {filtered.length} of {records.length} buildings</Text>
   </View>
  </ScrollView>
  {/* Category Choices */}
  <Modal transparent visible={filterOpen} animationType="fade" onRequestClose={()=>setFilterOpen(false)}><View style={styles.overlay}><Pressable style={styles.backdrop} accessibilityLabel="Close categories" onPress={()=>setFilterOpen(false)}/><View style={styles.dialog}>{['All Categories',...Object.keys(categoryColors)].map(c=><Pressable key={c} style={styles.option} onPress={()=>{setCategory(c);setFilterOpen(false);}}><Text style={styles.rowName}>{c}</Text></Pressable>)}</View></View></Modal>
  {/* Connected Building / Floors / Room Editor */}
  {draft&&<AdminBuildingEditor building={draft} onCancel={()=>setDraft(null)} onSave={updated=>{setRecords(old=>old.map(b=>b.id===updated.id?updated:b));setDraft(null);}}/>}
 </View></SafeAreaView>;
}
