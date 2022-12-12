import { SettingsTheme } from "../enums/settings.enum";

export interface Setting {
    id:string,
    theme: SettingsTheme,
    local_path_to_repositories: string
}