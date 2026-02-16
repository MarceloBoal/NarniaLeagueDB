import { supabase } from "./supabase.js";

async function loadPlayers() {
  const { data: stats, error: statsError } = await supabase
    .from("player_stats")
    .select("player_id, wins, defeats")
    .order("wins", { ascending: false });

  if (statsError) {
    console.log("Erro stats:", statsError);
    return;
  }

  const ids = stats.map(s => s.player_id);

  const { data: players, error: playersError } = await supabase
    .from("player")
    .select("id, nome")
    .in("id", ids);

  if (playersError) {
    console.log("Erro players:", playersError);
    return;
  }

  const playerMap = {};
  players.forEach(p => {
    playerMap[p.id] = p.nome;
  });

  const tbody = document.getElementById("players_list");
  tbody.innerHTML = "";

  stats.forEach((row, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td onclick="loadPlayerDetails(${row.player_id})">
        <span class="player-name">${playerMap[row.player_id] ?? "Desconhecido"}</span>
      </td>
      <td>${row.wins}</td>
      <td>${row.defeats}</td>
    `;

    tbody.appendChild(tr);
  });
}


async function loadPlayerDetails(playerId) {
  const { data: stats, error: statsError } = await supabase
    .from("player_stats")
    .select("wins, defeats, kills, deaths, assists")
    .eq("player_id", playerId)
    .single();

  if (statsError) {
    console.log("Erro stats:", statsError);
    return;
  }

  const { data: player, error: playerError } = await supabase
    .from("player")
    .select("nome")
    .eq("id", playerId)
    .single();

  if (playerError) {
    console.log("Erro player:", playerError);
    return;
  }

  document.getElementById("detail_name").innerText = player.nome;
  document.getElementById("detail_wins").innerText = stats.wins;
  document.getElementById("detail_defeats").innerText = stats.defeats;
  document.getElementById("detail_kills").innerText = stats.kills;
  document.getElementById("detail_deaths").innerText = stats.deaths;
  document.getElementById("detail_assists").innerText = stats.assists;

  let kda = (stats.kills + stats.assists) / (stats.deaths === 0 ? 1 : stats.deaths);
  document.getElementById("detail_kda").innerText = kda.toFixed(2);
}

window.loadPlayerDetails = loadPlayerDetails;

loadPlayers();
