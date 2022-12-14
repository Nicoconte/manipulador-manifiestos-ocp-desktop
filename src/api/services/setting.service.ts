import { PocketbaseCollections } from "../../data/enums/pbCollection.enum";
import { GlobalSetting } from "../../data/interfaces/setting.interface";
import { getPocketbaseErrorMessage } from "../../helpers/pocketbase.helper";
import { pb } from "../pocketbase";

export const SettingService = {
    getGlobalSetting: async(): Promise<GlobalSetting> => {
        try {
            return (await pb.collection(PocketbaseCollections.GlobalSettings).getFullList<GlobalSetting>())[0];
        } catch(err) {
            throw getPocketbaseErrorMessage(err);
        }
    },
    updateTheme: async(theme:string) => {
        try {
            let setting = (await pb.collection(PocketbaseCollections.GlobalSettings).getFullList<GlobalSetting>())[0];

            return await pb.collection(PocketbaseCollections.GlobalSettings).update(setting.id, {
                theme: theme
            });
        } catch(err) {
            throw getPocketbaseErrorMessage(err);
        }
    }
}