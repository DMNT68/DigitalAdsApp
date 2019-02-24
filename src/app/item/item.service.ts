import { Injectable } from "@angular/core";

import { Item } from "./item";

@Injectable({
    providedIn: "root"
})
export class ItemService {
    private items = new Array<Item>(
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus1', name: "Ter Stegen", role: "Goalkeeper" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus3', name: "Piqué", role: "Defender" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus4', name: "I. Rakitic", role: "Midfielder" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus5', name: "Sergio", role: "Midfielder" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus6', name: "Denis Suárez", role: "Midfielder" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus7', name: "Arda", role: "Midfielder" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus8', name: "A. Iniesta", role: "Midfielder" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus9', name: "Suárez", role: "Forward" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus10', name: "Messi", role: "Forward" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus11', name: "Neymar", role: "Forward" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus12', name: "Rafinha", role: "Midfielder" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus13', name: "Cillessen", role: "Goalkeeper" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus14', name: "Mascherano", role: "Defender" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus17', name: "Paco Alcácer", role: "Forward" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus18', name: "Jordi Alba", role: "Defender" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus19', name: "Digne", role: "Defender" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus20', name: "Sergi Roberto", role: "Midfielder" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus21', name: "André Gomes", role: "Midfielder" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus22', name: "Aleix Vidal", role: "Midfielder" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus23', name: "Umtiti", role: "Defender" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus24', name: "Mathieu", role: "Defender" },
        { id: 'dfbuiasbdfibeuibasudifbiwuebfiaus25', name: "Masip", role: "Goalkeeper" }
    );

    getItems(): Array<Item> {
        return this.items;
    }

    getItem(id: string): Item {
        return this.items.filter((item) => item.id === id)[0];
    }
}
