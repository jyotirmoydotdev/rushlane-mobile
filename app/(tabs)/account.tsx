import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronRight, User, Bell, Moon, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const SettingItem = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingItemLeft}>
        {icon}
        <Text style={styles.settingItemText}>{title}</Text>
      </View>
      <ChevronRight size={20} color="#666666" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <SettingItem icon={<User size={20} color="#000000" />} title="Account" />
        <SettingItem icon={<Bell size={20} color="#000000" />} title="Notifications" />
        {/* <SettingItem icon={<Moon size={20} color="#000000" />} title="Quick Help" /> */}
        <SettingItem icon={<HelpCircle size={20} color="#000000" />} title="Help" />
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#ff4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingItemText: {
    fontSize: 16,
    color: '#000000',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 32,
  },
  logoutText: {
    fontSize: 16,
    color: '#ff4444',
  },
});