import { CapacitorProject } from '@capacitor/project';
import { CapacitorConfig } from '@capacitor/cli';

// This takes a CapacitorConfig, such as the one in capacitor.config.ts, but only needs a few properties
// to know where the ios and android projects are
const config: CapacitorConfig = {
  ios: {
    path: 'ios',
  },
  android: {
    path: 'android',
  },
};
const updateProject = async () => {
    const project = new CapacitorProject(config);
    await project.load();

   project.android?.getAndroidManifest().setAttrs('manifest/application', {
    'android:name': 'com.modus.ishihara.app.MainActivity',   
    'android:screenOrientation': 'portrait',
    'android:label':'Ishihara'
  });
   await project.android.setPackageName('com.modus.ishihara.app')
   await project.android.setVersionName('1.0.3');
   await project.android.setVersionCode(3);
   await project.vfs.commitAll();
}

updateProject()