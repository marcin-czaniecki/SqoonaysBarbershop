# Salon and portfolio image provenance

## Permission

On 2026-11-01 the user supplied a photograph of the salon and explicitly authorized using further images from Dominika's and Patryk's platforms, confirming they have permission. Images are copied into the repository, optimized by Astro and served locally. There is no Instagram embed or image hotlinking.

| Local file | Source | Use |
| --- | --- | --- |
| `salon/interior.jpg` | User attachment `IMG_1505.jpeg`, supplied 2026-11-01 | Hero and gallery, salon interior at Mylna 1 as identified by the user |
| `gallery/sqoonay-haircut.webp` | https://www.instagram.com/sqoonaybarbershop/p/C69KGwmorG6/ | First photo of the post dated 2024-05-14; labelled as portfolio from the official Sqoonay profile |
| `gallery/dominika-haircut.jpg` | https://www.instagram.com/domi.nika_hair/p/C5eIdVmrPgR/ | First photo of the post dated 2024-04-07; labelled as Dominika's portfolio |

The selected Instagram posts tag a previous workplace, Salon Połom. The gallery explicitly describes the images as earlier portfolio work; they are not evidence of work photographed at the current Mylna premises. The Sqoonay post is attributed to its account; no unverified individual author attribution is added. People in the portfolio photographs are not identified by name.

The photo selection was inspected on the public profiles and the downloaded image files. No authentication bypass was used. Original files are retained; only build-time image optimization and CSS framing are applied. Astro's generated files omit source EXIF metadata, including location data. Permission for the employee portraits is documented separately in `team/SOURCES.md`.
