const hymn_regex_aabb = /^([0-9][0-9])-([0-9][0-9])(.*)/;
const hymn_regex_psalm = /^Ps ([0-9])(.*)/;

function getCategoryOfHymn(id)
{
    var match_aabb = id.match(hymn_regex_aabb);
    if (match_aabb) {
        var aa = parseInt(match_aabb[1], 10);
        var bb = parseInt(match_aabb[2], 10);
        switch (aa) {
        case 12: return "Autres psaumes";
        case 13: return "Chants de l'Ancien Testament";
        case 14: return "Chants du Nouveau Testament";
        case 21: return "Ouverture";
        case 22: return "Parole";
        case 23: return "Baptême";
        case 24: return "Repas du Seigneur";
        case 31: return "Avent";
        case 32: return "Noël";
        case 33: if (bb < 30) return "Carême — Passion";
                              return "Passion — Rameaux";
        case 34: if (bb < 27) return "Pâques";
                              return "Ascension";
        case 35: return "Pentecôte";
        case 36: return "Église";
        case 37: if (bb < 4)  return "Réformation";
                 if (bb < 10) return "Racines et patries";
                              return "Nouvelle année";
        case 41: return "Louange";
        case 42: return "Action de grâce";
        case 43: return "Repentance et conversion";
        case 44: return "Consécration et engagement";
        case 45: return "Paix et joie";
        case 46: return "Amour et service";
        case 47: return "Foi et confiance";
        case 48: return "Espérance";
        case 49: if (bb < 51) return "Soir et matin";
                              return "Repas";
        case 51: return "Louons Dieu";
        case 52: return "Chantons notre foi";
        case 53: return "Prions le Seigneur";
        case 54: return "De fête en fête";
        case 55: return "Chantons la Bible";
        case 56: return "Spirituals";
        case 61: if (bb < 11) return "Ouvrir la célébration";
                 if (bb < 30) return "Se reconnaître pêcheur";
                 if (bb < 51) return "Accueillir le pardon";
                 if (bb < 61) return "Gloire au Père, au Fils, à l'Esprit";
                 if (bb < 81) return "Recevoir la Parole";
                              return "Confesser la foi";
        case 62: if (bb < 21) return "S'unir à la prière";
                 if (bb < 31) return "Notre Père";
                 if (bb < 71) return "Autour de la table du Christ";
                              return "Envoi";
        case 63: if (bb < 11) return "Première suite liturgique romande";
                 if (bb < 21) return "Deuxième suite liturgique romande";
                 if (bb < 41) return "Liturgie pour un culte selon la tradition luthérienne";
                 if (bb < 51) return "Une liturgie pour notre temps";
                              return "Une liturgie « en canons »";
        case 64: return "Refrains psalmiques";
        case 70: return "Autres harmonisations";
        }
    }

    var match_psalm = id.match(hymn_regex_psalm);
    if (match_psalm) {
        return "Psautier de la Réforme";
    }

    return "";
}
