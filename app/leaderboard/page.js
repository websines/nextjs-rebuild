"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import supabase from "@/lib/SupabaseClient";

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "points",
    direction: "desc",
  });

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const { data: topUsersData } = await supabase
          .from("profiles")
          .select("username, avatar_url, points")
          .order(sortConfig.key, { ascending: sortConfig.direction === "asc" })
          .limit(5);

        setTopUsers(topUsersData || []);
      } catch (error) {
        console.error("Error fetching top users data:", error);
      }
    };

    fetchTopUsers();
  }, [sortConfig]); // Update top users when sort config changes

  const handleSort = (column) => {
    // If clicking on the same column, toggle the sort direction; otherwise, set the default direction to 'desc'
    const direction =
      column === sortConfig.key && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ key: column, direction });
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", my: 4 }}>
        Leaderboard
      </Typography>

      {/* Display Top Users */}
      <Typography variant="h6" sx={{ textAlign: "center", my: 2 }}>
        Top Users
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <SortableTableCell
                column="username"
                label="Username"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableTableCell
                column="points"
                label="Points"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableTableCell
                column="points"
                label="Points"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {topUsers.map((user) => (
              <TableRow key={user.username}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={user.avatar_url || "/path/to/default/avatar"}
                      sx={{ mr: 2 }}
                    />
                    {user.username}
                  </Box>
                </TableCell>
                <TableCell>{user.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const SortableTableCell = ({ column, label, sortConfig, onSort }) => {
  const isSortColumn = column === sortConfig.key;
  const sortDirection = isSortColumn
    ? sortConfig.direction === "asc"
      ? "desc"
      : "asc"
    : "asc";

  return (
    <TableCell onClick={() => onSort(column)}>
      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        {label}
        {isSortColumn && (
          <Typography variant="caption" color="primary" sx={{ ml: 1 }}>
            {sortDirection === "asc" ? "▲" : "▼"}
          </Typography>
        )}
      </Box>
    </TableCell>
  );
};

export default Leaderboard;
