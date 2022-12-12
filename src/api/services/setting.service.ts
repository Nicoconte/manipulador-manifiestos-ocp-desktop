import { PocketbaseCollections } from "../../data/enums/pbCollection.enum";
import { Setting } from "../../data/interfaces/setting.interface";
import { getPocketbaseErrorMessage } from "../../helpers/pocketbase.helper";
import { pb } from "../pocketbase";

export const SettingService = {
    get: async(): Promise<Setting> => {
        try {
            return (await pb.collection(PocketbaseCollections.Settings).getFullList<Setting>())[0];
        } catch(err) {
            throw getPocketbaseErrorMessage(err);
        }
    },
    updateTheme: async(theme:string) => {
        try {
            let setting = (await pb.collection(PocketbaseCollections.Settings).getFullList<Setting>())[0];

            return await pb.collection(PocketbaseCollections.Settings).update(setting.id, {
                theme: theme
            });
        } catch(err) {
            throw getPocketbaseErrorMessage(err);
        }
    }
}