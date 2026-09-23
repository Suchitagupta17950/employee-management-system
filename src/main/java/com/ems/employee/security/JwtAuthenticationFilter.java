package com.ems.employee.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserDetailsService userDetailsService) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
System.out.println("JWT FILTER CALLED → " + request.getRequestURI());

        String authHeader = request.getHeader("Authorization");
System.out.println("AUTH HEADER = " + authHeader);

      

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        
        boolean valid = jwtService.isTokenValid(token);
System.out.println("JWT VALID = " + valid);

        

        if (!valid) {
            filterChain.doFilter(request, response);
            return;
        }

        String username = jwtService.extractUsername(token);


        if (SecurityContextHolder.getContext().getAuthentication() == null) {

            String role = jwtService.extractRole(token);


            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            java.util.List.of(
                                    new org.springframework.security.core.authority.SimpleGrantedAuthority(
                                            "ROLE_" + role
                                    )
                            )
                    );

            authentication.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request)
            );

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);
                    System.out.println(
        "JWT FILTER → Authentication set: "
        + SecurityContextHolder.getContext()
                .getAuthentication()
                .getAuthorities()
);
        }

        filterChain.doFilter(request, response);
    }
}