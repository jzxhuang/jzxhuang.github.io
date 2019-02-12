module Main exposing (main)

import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Region as Region
import Html
import Html.Attributes exposing (class)



-- MAIN


main =
    layout [ Font.family [ Font.typeface "Open Sans", Font.sansSerif ], Background.color (rgb255 248 249 250) ] <|
        column
            -- Card with shadow
            [ centerX
            , centerY
            , width (maximum 500 fill)
            , height (maximum 850 fill)
            , paddingEach { left = 10, right = 10, top = 10, bottom = 10 }
            , Border.color (rgb255 219 219 219)
            , Border.shadow { blur = 20, color = rgba 0 0 0 0.1, offset = ( 0, 0 ), size = 1 }
            , Background.color (rgb255 255 255 255)
            , spacing 42
            ]
            -- Main content
            [ column [ centerX, centerY, spacing 42, paddingEach { edges | top = 10 }, Region.mainContent ]
                [ -- Photo
                  image [ centerX, htmlAttribute <| class "headshot" ]
                    { src = "images/headshot.jpg", description = "Jeffrey Huang" }

                -- h1 and h2
                , column [ spacing 10, centerX, Font.center ]
                    [ el [ Region.heading 1, Font.size 48, centerX ] <| text "Jeffrey Huang"
                    , el [ Region.heading 2, Font.size 20, centerX, Font.light, Font.italic, Font.color <| rgb255 170 170 170 ] <| text "Ideas start here..."
                    ]

                -- Intro paragraph
                , paragraph [ Font.center, Font.light, paddingXY 20 0, Font.size 15, centerX, spacing 10 ]
                    [ text "Hey! I'm a computer engineering student at the University of Waterloo. I love all things tech, and I also love travelling, snowboarding, and trying new food." ]

                -- Social Links (icons)
                , viewSocialLinks

                -- Nav links (text)
                , row [ Region.navigation, Font.light, Font.color <| rgb255 0 0 180, centerX, spacing 45, htmlAttribute <| class "nav-links" ]
                    [ newTabLink [] { url = "https://medium.com/@jzxhuang/", label = text "Blog" }
                    , newTabLink [] { url = "resume_jhuang.pdf", label = text "Resume" }
                    ]
                ]

            -- Footer
            , paragraph
                [ Region.footer
                , paddingXY 0 10
                , Font.color (rgb255 170 170 170)
                , Font.light
                , centerX
                , Font.center
                , Font.size 12
                , alignBottom
                ]
                [ text "Made with ♥ and Elm—"
                , newTabLink [ htmlAttribute <| class "footer-link" ] { url = "https://github.com/jzxhuang/jzxhuang.github.io", label = text "see source code" }
                , text " | © 2019 Jeffrey Huang"
                ]
            ]


viewSocialLinks : Element msg
viewSocialLinks =
    row [ spacing 25, centerX ]
        [ newTabLink [ ariaLabel "Medium Blog" ] { url = "https://medium.com/@jzxhuang/", label = faIcon "fab fa-medium-m" }
        , newTabLink [ ariaLabel "Instagram" ] { url = "https://instagram.com/jzxhuang/", label = faIcon "fab fa-instagram" }
        , newTabLink [ ariaLabel "Github" ] { url = "https://github.com/jzxhuang/", label = faIcon "fab fa-github" }
        , newTabLink [ ariaLabel "Email" ] { url = "mailto:jzxhuang@edu.uwaterloo.ca", label = faIcon "far fa-envelope" }
        , newTabLink [ ariaLabel "LinkedIn" ] { url = "https://linkedin.com/in/jzxhuang/", label = faIcon "fab fa-linkedin-in" }
        ]


ariaLabel : String -> Attribute msg
ariaLabel label =
    htmlAttribute <| Html.Attributes.attribute "aria-label" label


faIcon : String -> Element msg
faIcon icon =
    html <| Html.i [ class icon ] [ Html.text "" ]


edges =
    { left = 0, right = 0, top = 0, bottom = 0 }
